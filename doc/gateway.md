# Apache Camel Workshop: Gateway Service

The gateway service is the central part of the system and the most interesting one from a Camel point of view.
It provides a unique access point to all other microservices, with a consistent API.

## Creating the project

We'll create a *Camel* on *spring-boot* project:

- Go to [https://start.spring.io](https://start.spring.io)
- Select Spring-Boot version *1.5.13* (Camel *2.22.0*, released mid June 2018, supports spring-boot *2.x*)
- Add to the list of dependencies: `Apache Camel`, `Web`, `DevTools` (for auto-reload)  
- Set groupId to `org.apache.camel.workshop` and project name to `gateway`
- Download the project archive and extract
- Open it in your IDE

As done for the previous service, you can do a first build from the root directory of the project (where `pom.xml` is located) with the command:

```
mvn clean install
```

## Adding supporting beans

We'll use some supporting beans, mostly shared with the other microservices. They should be placed in the `org.apache.camel.workshop.gateway` package.  

- [Item.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/gateway/src/main/java/org/apache/camel/workshop/gateway/Item.java) (Item bean, enhanced with `recommended` field)
- [Catalog.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/gateway/src/main/java/org/apache/camel/workshop/gateway/Catalog.java) (Catalog bean)
- [Order.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/gateway/src/main/java/org/apache/camel/workshop/gateway/Order.java) (Order bean)
- [Payment.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/gateway/src/main/java/org/apache/camel/workshop/gateway/Payment.java) (Payment bean)

(*right click, save link as...*)

## Adding dependencies

For a gateway service it may be useful to replace the default *Tomcat* server used by 
*Spring-Boot* with *Undertow*. *Camel* will do a lot of proxy operations, and it can use
*Undertow* to both receive and send *HTTP* messages.

Let's **replace** the `spring-boot-starter-web` dependency with the following.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```  


Now, let's add the Camel component that we need in the `pom.xml` file.

```xml
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-servlet-starter</artifactId>
    <version>2.21.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-undertow-starter</artifactId>
    <version>2.21.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-jackson-starter</artifactId>
    <version>2.21.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-bean-validator-starter</artifactId>
    <version>2.21.1</version>
</dependency>
```  

## Configure REST environment 

Create a empty `GatewayRoutes` class with some utility methods:

```java
package org.apache.camel.workshop.gateway;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GatewayRoutes extends RouteBuilder {



    @Override
    public void configure() throws Exception {

        restConfiguration()
                .component("servlet")
                .enableCORS(true);



        // routes here

    }

    /*
     * Utility methods
     */


    private Payment createPayment(Order order) {
        Payment payment = new Payment();
        payment.setUser(order.getUser());
        payment.setReference(order.getReference());
        payment.setAmount(order.getPrice());
        return payment;
    }

    // Needed later when we add recommendations
    private Catalog recommend(Catalog catalog, List<String> recomm) {
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
```

We enabled CORS for all origins in this demo. We also configured the Camel component that
should be used to expose the rest endpoints (`servlet`) because Camel detects that there are 2 
components that are able to expose REST (`servlet` and `undertow`, the last one can be used when not using `spring-web`).

You should also configure the context path in the `src/main/resources/application.properties` file (server port will be the default: **8080**).

Since the gateway will call the other miroservices, we configure here their endpoints.

```properties
camel.component.servlet.mapping.context-path=/api/*
#server.port=8080

inventory.host=localhost
inventory.port=8081
inventory.service=${inventory.host}:${inventory.port}

credit.host=localhost
credit.port=8082
credit.service=${credit.host}:${credit.port}

recommendation.host=localhost
recommendation.port=8083
recommendation.service=${recommendation.host}:${recommendation.port}
```

## Adding simple proxy endpoints

Some of the endpoints exposed by the gateway are simple *proxy* endpoints that 
forward requests to the other services. We can declare them easily (*inside the `configure()` method, right after `restConfiguration()` declaration*):

```java
rest().get("/payments")
        .route()
        .to("undertow:http://{{credit.service}}/api/payments");

rest().get("/purchases")
        .route()
        .to("undertow:http://{{inventory.service}}/api/purchases");

rest().get("/items")
        .route()
        .to("undertow:http://{{inventory.service}}/api/items");
```

For the moment, Camel does not apply any transformation to these routes.

We'll change the `/items` endpoint *later to add recommendations, circuit breaking and caching*.

## Adding a endpoint execute a Order

Executing a order is a complex workflow. The user sends a Order object containing a set of items
and the gateway should *make a Payment* using the credit service and *add all Purchases* in the inventory service.

Let's add the following code to make a order (*inside the `configure()` method, right after the previous `rest()` declaration*): 


```java
rest().post("/orders")
        .type(Order.class)
        .route()
        .unmarshal().json(JsonLibrary.Jackson, Order.class)
        .to("bean-validator:validateOrder")
        .multicast().parallelProcessing()
            .to("direct:payOrder")
            .to("direct:purchaseOrderItems")
        .end()
        .marshal().json(JsonLibrary.Jackson);

// Sub-route for credit
from("direct:payOrder")
        .setBody().body(Order.class, this::createPayment)
        .marshal().json(JsonLibrary.Jackson)
        .to("undertow:http://{{credit.service}}/api/payments");

// Sub-route for inventory
from("direct:purchaseOrderItems")
        .setHeader("reference", simple("${body.reference}"))
        .split().simple("${body.items}").parallelProcessing()
            .toD("undertow:http://{{inventory.service}}/api/purchases/${header.reference}/items/${body.id}?amount=${body.amount}")
```

We've written 2 sub-routes for making a payment from a order and purchasing all items contained in the order.

Note that **all endpoints are invoked in parallel**, also the calls for different items of the inventory (simulates the case where items are present in different inventories).

## Start the service

Start the app with `mvn clean spring-boot:run` and go to the following link: [http://localhost:8080/api/items](http://localhost:8080/api/items)
to check if everything is working fine. The catalog is proxied from the inventory service. 

## Test the service

**Get Catalog**
```
http GET :8080/api/items
```

**Get all Purchases**
```
http GET :8080/api/purchases
```

**Get all Payments**
```
http GET :8080/api/payments
```

**Make a Order**
```
echo '{"reference": "order-1", "user": "cippalippa", "items": [{"id": "i1", "amount": 3}], "price": 3}' | http POST :8080/api/orders
```

