# Apache Camel Workshop: Inventory Service

The inventory microservice manages items available in the store and purchases of the same items.
Item availability is decreased when a purchase is done, if enough items are available.
Purchase cancellation is also supported.

## Creating the project

We'll create a *Camel* on *spring-boot* project:

- Go to [https://start.spring.io](https://start.spring.io)
- Select Spring-Boot version *2.0.5*
- Add to the list of dependencies: `Apache Camel`, `Web`, `DevTools` (for auto-reload) 
- Set groupId to `org.apache.camel.workshop` and project name to `inventory`
- Download the project archive and extract
- Open it in your IDE

As done for the previous service, you can do a first build from the root directory of the project (where `pom.xml` is located) with the command:

```
mvn clean install
```

## Adding the business logic and supporting beans

We'll not write the business logic, instead we'll start from existing classes and we'll wire APIs.

Download the supporting classes from here and place them in the `org.apache.camel.workshop.inventory` package:

- [Item.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/java/org/apache/camel/workshop/inventory/Item.java) (Item bean)
- [Catalog.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/java/org/apache/camel/workshop/inventory/Catalog.java) (Catalog bean)
- [Purchase.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/java/org/apache/camel/workshop/inventory/Purchase.java) (Purchase bean)
- [Inventory.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/java/org/apache/camel/workshop/inventory/Inventory.java) (Inventory interface)
- [InventoryImpl.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/java/org/apache/camel/workshop/inventory/InventoryImpl.java) (Inventory implementation)

(*right click, save link as...*)

We will use a static catalog that should be saved in `src/main/resources` and can be downloaded from here:

- [catalog.json](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/inventory/src/main/resources/catalog.json) (Catalog json)

(*right click, save link as...*)

## Adding Camel dependencies

Let's start now writing REST endpoints with Camel.

First, let's add the following dependencies to the `pom.xml` file.

```xml
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-servlet-starter</artifactId>
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-jackson-starter</artifactId>
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-swagger-java-starter</artifactId>
    <version>2.22.1</version>
</dependency>
```

We have already seen the first two dependencies in other services. 

The `camel-swagger-java-starter` dependency will be used to publish the *Swagger 2.0* specifications of the 
API we are going to write.  

## Configure REST environment 

Create a empty `InventoryRoutes` class:

```java
package org.apache.camel.workshop.inventory;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.stereotype.Component;

@Component
public class InventoryRoutes extends RouteBuilder {

    @Override
    public void configure() {

        // Routes here

    }
}

```

We will fill that class with all REST routes that we need.

Add a global REST configuration like:

```java
restConfiguration()
        .bindingMode(RestBindingMode.json)
        .enableCORS(true)
        .apiContextPath("/doc")
        .apiProperty("api.title", "Inventory API")
        .apiProperty("api.version", "1.0");
```

This setup the context path where swagger spec will be available (`/doc`) and general information about the API.

You should also configure the server port (**8081** for this service) and the context path in the `src/main/resources/application.properties` file:

```properties
camel.component.servlet.mapping.context-path=/api/*
server.port=8081
```

## Adding a endpoint to GET the Catalog

The following route can be written to create a REST endpoint that returns the full catalog (*inside the `configure()` method*).

```java
rest().get("/items")
    .responseMessage()
        .code(200).message("Ok")
    .endResponseMessage()
    .route().id("getItems")
    .bean("inventory", "getCatalog");
```

It's a simple bean call, but note how we added annotation for describing return codes.

## Adding a endpoint to GET the Purchases

Purchases can be similarly obtained with the following route (*inside the `configure()` method, right after the previous `rest()` declaration*):

```java
rest().get("/purchases")
    .responseMessage()
        .code(200).message("Ok")
    .endResponseMessage()
    .route().id("getPurchases")
    .bean("inventory", "getPurchases");
```

## Adding a endpoint to ADD items to a Purchase

To make thing a bit complex, we let user to provide the list of items they are going to buy one by one.
Items can be added to a purchase (that is created the first time is encountered) using the following route (*inside the `configure()` method, right after the previous `rest()` declaration*):

```java
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
```

There are several patterns and annotations used here.

First, note that the 3 parameters have been described in the first part of the route.
Two parameters are path parameters and one is a query parameter: the `amount` is a optional query parameter and 
if the client does not provide it, it's assumed that the client will buy one item.

There is a `choice()` EIP with a `simple` predicate. A choice is the standard way to make a 
if-then-else flow in a route and the condition to branch is expressed through the Camel simple language.
The simple language is... simple.

Once the check is done, we make a basic validation to ensure that we don't receive a negative number of items to purchase. 

## Adding a endpoint to DELETE a Purchase

Purchase deletion can be done with a route like the following (*inside the `configure()` method, right after the previous `rest()` declaration*):


```java
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
```

Note that once a purchase is deleted, no items can be added to it and items are considered available again.

## Start the service

Start the app with `mvn clean spring-boot:run` and go to the following link: [http://localhost:8081/api/items](http://localhost:8081/api/items)
to check if everything is working fine.

## Checking the Swagger doc

Point your browser to the URL [http://localhost:8081/api/doc](http://localhost:8081/api/doc), you will find
the swagger definition of all the services.

You can visualize the API on [https://editor.swagger.io](https://editor.swagger.io).
Since we have enabled CORS, you can go to the Swagger editor website, click on *File -> Import URL* and paste `http://localhost:8081/api/doc`.

The API will be shown and there are tools e.g. to generate clients for many languages. 

## Test the service

If you have HTTPie installed you can test the following calls.

**Get Swagger Doc**
```
http GET :8081/api/doc
```

**Get Catalog**
```
http GET :8081/api/items
```

**Get all Purchases**
```
http GET :8081/api/purchases
```

**Add item to a Purchase**
```
http POST :8081/api/purchases/ref1/items/i1?amount=2
```

**Delete a Purchase**
```
http DELETE :8081/api/purchases/ref1
```

