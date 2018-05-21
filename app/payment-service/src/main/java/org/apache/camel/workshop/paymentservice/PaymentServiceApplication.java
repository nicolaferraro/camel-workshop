package org.apache.camel.workshop.paymentservice;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class PaymentServiceApplication {



	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {
		@Override
		public void configure() {

			rest().post("/payments/{ref}")
					.param()
						.name("ref")
						.type(RestParamType.path)
						.description("Reference code")
					.endParam()
					.param()
						.name("user")
						.type(RestParamType.query)
						.description("Owner of the account")
					.endParam()
					.param()
						.name("amount")
						.type(RestParamType.query)
						.description("Amount to pay")
					.endParam()
					.route()
					.validate(header("amount").convertTo(Integer.class).isGreaterThanOrEqualTo(0))
					.bean("bank", "pay(${header.ref}, ${header.userId}, ${header.amount})");


			rest().delete("/payments/{ref}")
				    .param()
    					.name("ref")
    					.type(RestParamType.path)
    					.description("Reference code")
    				.endParam()
    				.route()
                    .bean("bank", "cancel(${header.ref})");

		}
	}



}
