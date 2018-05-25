package org.apache.camel.workshop.gateway;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.caffeine.CaffeineConstants;
import org.apache.camel.http.common.HttpMethods;
import org.apache.camel.impl.saga.InMemorySagaService;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {

		@Override
		public void configure() throws Exception {

			restConfiguration().component("servlet").enableCORS(true);
			getContext().addService(new InMemorySagaService(), true);

			/*
			 * Items
			 */

			rest().get("/items")
					.route()
					.to("undertow:http://{{inventory.host}}:{{inventory.port}}/api/items")
                    .unmarshal().json(JsonLibrary.Jackson, Catalog.class)
                    .enrichWith("direct:recommendationHystrix").body(Catalog.class, List.class, GatewayApplication::recommend)
					.marshal().json(JsonLibrary.Jackson);

			/*
			 * Recommendations
			 */

			from("direct:recommendationHystrix")
					.hystrix()
						.to("direct:recommendation")
						.setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_PUT))
						.to("caffeine-cache:global?key=recommendation")
					.onFallback()
						.setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_GET))
						.to("caffeine-cache:global?key=recommendation")
						.choice()
							.when(header("CamelCaffeineActionHasResult").isNotEqualTo(true))
								.setBody(constant(Collections.emptyList()))
						.end()
					.end();

			from("direct:recommendation")
					.setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
					.to("undertow:http://{{recommendation.host}}:{{recommendation.port}}/api/recommendations")
					.unmarshal().json(JsonLibrary.Jackson, List.class);


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
							.setHeader("reference", simple("${body.reference}"))
							.multicast().parallelProcessing()
								.pipeline()
									.setBody().body(Order.class, GatewayApplication::createPayment)
									.marshal().json(JsonLibrary.Jackson)
									.to("undertow:http://{{payment.host}}:{{payment.port}}/api/payments")
								.end()
								.split().simple("${body.items}").parallelProcessing()
									.toD("undertow:http://{{inventory.host}}:{{inventory.port}}/api/purchases/${header.reference}/items/${body.id}?amount=${body.amount}")
								.end()
							.end()
							.marshal().json(JsonLibrary.Jackson)
					.end();


			from("direct:cancelOrder")
					.setBody(header("order")).convertBodyTo(String.class)
					.unmarshal().json(JsonLibrary.Jackson, Order.class)
					.setHeader("order", simple("${body.reference}"))
					.setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.DELETE))
					.multicast().parallelProcessing()
						.toD("undertow:http://{{payment.host}}:{{payment.port}}/api/payments/${header.order}")
						.toD("undertow:http://{{inventory.host}}:{{inventory.port}}/api/purchases/${header.order}");

			/*
			 * Proxied requests
			 */

			rest().get("/purchases")
					.route()
					.to("undertow:http://{{inventory.host}}:{{inventory.port}}/api/purchases");

			rest().get("/payments")
					.route()
					.to("undertow:http://{{payment.host}}:{{payment.port}}/api/payments");


		}
	}

	private static Payment createPayment(Order order) {
		Payment payment = new Payment();
		payment.setUser(order.getUser());
		payment.setReference(order.getReference());
		payment.setAmount(order.getPrice());
		return payment;
	}

	private static Catalog recommend(Catalog catalog, List<String> recomm) {
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
