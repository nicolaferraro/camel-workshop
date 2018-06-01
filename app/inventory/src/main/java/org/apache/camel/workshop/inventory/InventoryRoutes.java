package org.apache.camel.workshop.inventory;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.stereotype.Component;

@Component
public class InventoryRoutes extends RouteBuilder {

    @Override
    public void configure() {

        /*
         * Main REST Config
         */

        restConfiguration()
                .bindingMode(RestBindingMode.json)
                .enableCORS(true)
                .apiContextPath("/doc")
                .apiProperty("api.title", "Inventory API")
                .apiProperty("api.version", "1.0");


        /*
         * GET /items
         */

        rest().get("/items")
                .responseMessage()
                    .code(200).message("Ok")
                .endResponseMessage()
                .route().id("getItems")
                .bean("inventory", "getCatalog");


        /*
         * GET /purchases
         */

        rest().get("/purchases")
                .responseMessage()
                    .code(200).message("Ok")
                .endResponseMessage()
                .route().id("getPurchases")
                .bean("inventory", "getPurchases");

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
                .route().id("addToPurchase")
                .choice()
                    .when(simple("${header.amount} == null"))
                        .setHeader("amount", constant(1))
                .end()
                .validate(header("amount").convertTo(Integer.class).isGreaterThan(0))
                .bean("inventory", "addToPurchase(${header.ref}, ${header.id}, ${header.amount})");


        /*
         * DELETE /purchases/{ref}
         */

        rest().delete("/purchases/{ref}")
                .param()
                    .name("ref")
                    .description("Reference code of the purchase")
                    .type(RestParamType.path)
                .endParam()
                .responseMessage()
                    .code(200).message("Ok")
                .endResponseMessage()
                .route().id("deletePurchase")
                .bean("inventory", "cancelPurchase(${header.ref})");


    }
}
