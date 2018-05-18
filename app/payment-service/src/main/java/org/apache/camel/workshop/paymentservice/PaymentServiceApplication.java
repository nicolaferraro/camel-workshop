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

	private static Map<String, Integer> accounts = new HashMap<>();

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

	@Component
	public static class CamelRoutes extends RouteBuilder {
		@Override
		public void configure() {

			rest().post("/payments/{userId}")
					.param()
						.name("amount")
						.type(RestParamType.query)
						.description("Amount to pay")
					.endParam()
					.route()
					.validate(header("amount").convertTo(Integer.class).isGreaterThan(0))
					.bean(PaymentServiceApplication.class, "pay(${header.userId}, ${header.amount})");
		}
	}

	public static synchronized void pay(String userId, int amount) {

		Integer current = accounts.get(userId);
		if (current == null) {
			current = 100; // BASE value
		}

		if (current - amount < 0) {
			throw new IllegalStateException("Insufficient credit!");
		}

		int newCredit = current - amount;
		accounts.put(userId, newCredit);
	}

}
