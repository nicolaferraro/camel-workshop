package org.apache.camel.workshop.gateway;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.List;

@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {

		@Override
		public void configure(){

			restConfiguration().component("servlet").enableCORS(true);

			rest().get("/items")
					.route()
					.to("undertow:http://{{inventory.host}}:{{inventory.port}}/api/items")
                    .unmarshal().json(JsonLibrary.Jackson, Catalog.class)
                    .enrichWith("direct:recommendation").body(Catalog.class, List.class, GatewayApplication::recommend)
					.marshal().json(JsonLibrary.Jackson);


			from("direct:recommendation")
                    .to("undertow:http://{{recommendation.host}}:{{recommendation.port}}/api/recommendations?bridgeEndpoint=true")
                    .unmarshal().json(JsonLibrary.Jackson, List.class);



			rest().post("/orders")
					.type(Order.class)
					.route()
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
					.marshal().json(JsonLibrary.Jackson);


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
