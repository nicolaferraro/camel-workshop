package org.apache.camel.workshop.credit;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.stereotype.Component;

@Component
public class CreditRoutes extends RouteBuilder {

	@Override
	public void configure() {

		rest().get("/payments")
				.route()
				.bean("creditStore", "list")
				.marshal().json(JsonLibrary.Jackson);


		rest().post("/payments")
				.route()
				.unmarshal().json(JsonLibrary.Jackson, Payment.class)
				.to("bean-validator:validatePayment")
				.bean("creditStore", "add")
				.marshal().json(JsonLibrary.Jackson);


		rest().delete("/payments/{ref}")
				.param()
					.name("ref")
					.type(RestParamType.path)
					.description("Reference code")
				.endParam()
				.route()
				.bean("creditStore", "remove(${header.ref})");

	}


}
