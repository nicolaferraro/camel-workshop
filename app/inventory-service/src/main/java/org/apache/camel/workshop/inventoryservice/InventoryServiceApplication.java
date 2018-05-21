package org.apache.camel.workshop.inventoryservice;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {

		@Override
		public void configure() {

			/*
			 * Main REST Config
			 */

			restConfiguration()
					.apiContextPath("/doc")
					.apiProperty("api.title", "Inventory API")
					.apiProperty("api.version", "1.0")
					.bindingMode(RestBindingMode.json);


			/*
			 * GET /items
			 */

			rest().get("/items")
					.responseMessage()
						.code(200).message("Ok")
					.endResponseMessage()
					.route()
					.bean("inventory", "getItems");


			/*
			 * POST /purchases/{ref}/items/{id}
			 */


			rest().post("/purchases/{ref}/items/{id}")
					.param()
						.name("ref")
						.description("Reference code of the purchase")
						.type(RestParamType.path)
					.endParam()
					.param()
						.name("id")
						.description("Item Id")
						.type(RestParamType.path)
					.endParam()
					.param()
						.name("amount")
						.description("Amount to buy")
						.type(RestParamType.query)
						.required(false)
					.endParam()
					.responseMessage()
						.code(200).message("Ok")
					.endResponseMessage()
					.route()
						.choice()
							.when(simple("${header.amount} == null"))
								.setHeader("amount", constant(1))
						.end()
                        .validate(header("amount").convertTo(Integer.class).isGreaterThan(0))
						.bean("inventory", "buy(${header.ref}, ${header.id}, ${header.amount})");


			/*
			 * DELETE /purchases/{ref}
			 */

			rest().delete("/purchases/{ref}")
				.param()
					.name("ref")
					.description("Reference code of the purchase")
					.type(RestParamType.path)
				.endParam()
				.route()
				.bean("inventory", "cancel(${header.ref})");



		}
	}
}
