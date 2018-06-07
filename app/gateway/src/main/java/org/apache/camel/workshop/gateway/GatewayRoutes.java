package org.apache.camel.workshop.gateway;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.caffeine.CaffeineConstants;
import org.apache.camel.http.common.HttpMethods;
import org.apache.camel.impl.saga.InMemorySagaService;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class GatewayRoutes extends RouteBuilder {



    @Override
    public void configure() throws Exception {

        restConfiguration()
                .component("servlet")
                .enableCORS(true);


        getContext().addService(new InMemorySagaService(), true);

        /*
         * Proxied requests
         */

        rest().get("/payments")
                .route()
                .to("undertow:http://{{credit.service}}/api/payments");

        rest().get("/purchases")
                .route()
                .to("undertow:http://{{inventory.service}}/api/purchases");

        /*
         * Items
         */

        rest().get("/items")
                .route()
                .to("undertow:http://{{inventory.service}}/api/items")
                .unmarshal().json(JsonLibrary.Jackson, Catalog.class)
                .enrichWith("direct:recommendation")
                    .body(Catalog.class, List.class, this::recommend)
                .marshal().json(JsonLibrary.Jackson);

        /*
         * Recommendations
         */

        from("direct:recommendation")
            .hystrix()
                .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
                .to("undertow:http://{{recommendation.service}}/api/recommendations")
                .unmarshal().json(JsonLibrary.Jackson, List.class)
                .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_PUT))
                .setHeader(CaffeineConstants.KEY, constant("recommendation"))
                .to("caffeine-cache:global")
            .endHystrix()
            .onFallback()
                .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_GET))
                .setHeader(CaffeineConstants.KEY, constant("recommendation"))
                .to("caffeine-cache:global")
                .choice()
                    .when(header("CamelCaffeineActionHasResult").isNotEqualTo(true))
                        .setBody(constant(Collections.emptyList()))
                .end()
            .end();


        /*
         * Orders
         */

        rest().post("/orders")
                .type(Order.class)
                .route()
                .saga()
                    .compensation("direct:cancelOrder")
                    .option("order", simple("${body}"))
                        .unmarshal().json(JsonLibrary.Jackson, Order.class)
                        .to("bean-validator:validateOrder")
                        .multicast().parallelProcessing()
                            .to("direct:payOrder")
                            .to("direct:purchaseOrderItems")
                        .end()
                        .marshal().json(JsonLibrary.Jackson)
                .end();

        from("direct:payOrder")
                .setBody().body(Order.class, this::createPayment)
                .marshal().json(JsonLibrary.Jackson)
                .to("undertow:http://{{credit.service}}/api/payments");


        from("direct:purchaseOrderItems")
                .setHeader("reference", simple("${body.reference}"))
                .split().simple("${body.items}").parallelProcessing()
                    .toD("undertow:http://{{inventory.service}}/api/purchases/${header.reference}/items/${body.id}?amount=${body.amount}")
                .end();


        from("direct:cancelOrder")
                .setBody(header("order")).convertBodyTo(String.class)
                .unmarshal().json(JsonLibrary.Jackson, Order.class)
                .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.DELETE))
                .multicast().parallelProcessing()
                    .toD("undertow:http://{{credit.service}}/api/payments/${body.reference}")
                    .toD("undertow:http://{{inventory.service}}/api/purchases/${body.reference}");


    }

    private Payment createPayment(Order order) {
        Payment payment = new Payment();
        payment.setUser(order.getUser());
        payment.setReference(order.getReference());
        payment.setAmount(order.getPrice());
        return payment;
    }

    private Catalog recommend(Catalog catalog, List<String> recomm) {
        if (recomm != null && catalog != null && catalog.getItems() != null) {
            for (String recommItem : recomm) {
                Item item = catalog.getItems().get(recommItem);
                if (item != null) {
                    item.setRecommended(true);
                }
            }
        }
        return catalog;
    }
}
