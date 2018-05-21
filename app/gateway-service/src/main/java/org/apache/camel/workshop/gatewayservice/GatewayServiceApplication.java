package org.apache.camel.workshop.gatewayservice;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.List;

@SpringBootApplication
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {

		@Override
		public void configure(){

			restConfiguration().component("servlet");

			rest().get("/items")
					.route()
					.to("undertow:http://{{inventory.host}}:{{inventory.port}}/api/items?bridgeEndpoint=true")
                    .unmarshal().json(JsonLibrary.Jackson, Item.Items.class)
                    .enrichWith("direct:recommendation").body(Item.Items.class, List.class, GatewayServiceApplication::recommend);


			from("direct:recommendation")
                    .to("undertow:http://{{recommendation.host}}:{{recommendation.port}}/api/recommendations?bridgeEndpoint=true")
                    .unmarshal().json(JsonLibrary.Jackson, List.class);



			rest().post("/purchases/{ref}/checkout")
					.param()
						.name("cart")
						.description("The cart to checkout")
						.type(RestParamType.body)
					.endParam()
					.param()
						.name("ref")
						.description("Reference of order")
						.type(RestParamType.path)
					.endParam()
					.param()
						.name("user")
						.description("User that is making the checkout")
						.type(RestParamType.query)
					.endParam()
					.route()
					.validate(header("ref").isNotNull())
					.validate(header("user").isNotNull())
					.unmarshal().json(JsonLibrary.Jackson, Cart.class)
					.to("bean-validator:validation")
					.multicast().parallelProcessing()
						.pipeline()
							.setHeader(Exchange.HTTP_QUERY, simple("amount=${body.price}&user=${header.user}"))
							.toD("undertow:http://{{payment.host}}:{{payment.port}}/api/payments/${header.ref}?bridgeEndpoint=true")
						.end()
						.split().simple("${body.items}").parallelProcessing()
							.toD("undertow:http://{{inventory.host}}:{{inventory.port}}/api/purchases/${header.ref}/items/${body.id}?amount=${body.amount}&bridgeEndpoint=true")
						.end()
					.end()
					.log("Finished");


		}
	}


	private static Item.Items recommend(Item.Items items, List<String> recomm) {
	    if (recomm != null && items != null) {
            for (Item item : items.getItems()) {
                if (recomm.contains(item.getId())) {
                    item.setRecommended(true);
                }
            }
        }
        return items;
    }


}
