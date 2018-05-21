package org.apache.camel.workshop.recommendationservice;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Collections;

@SpringBootApplication
public class RecommendationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendationServiceApplication.class, args);
	}


	@Component
	public static class Routes extends RouteBuilder {

		@Override
		public void configure() {

			restConfiguration().bindingMode(RestBindingMode.json);

			rest().get("/recommendations")
					.route()
					.setBody(constant(Collections.singletonList("99")));

		}

	}

}
