# Apache Camel Workshop: Gateway Service

The gateway service is the central part of the system and the most interesting one from a Camel point of view.
It provides a unique access point to all other microservices, with a consistent API.

## Creating the project

We'll create a *Camel* on *spring-boot* project:

- Go to [https://start.spring.io](https://start.spring.io)
- Select Spring-Boot version *2.0.5*
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
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-undertow-starter</artifactId>
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-jackson-starter</artifactId>
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-bean-validator-starter</artifactId>
    <version>2.22.1</version>
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


```properties
camel.component.servlet.mapping.context-path=/api/*
#server.port=8080
```

## Adding a simple proxy endpoint

Let's try to create a basic proxy endpoint towards the *payments* service.

In the *configure()* method we can add the following rest endpoint (*inside the `configure()` method, right after `restConfiguration()` declaration*):

```java
rest().get("/payments")
        .route()
        .to("undertow:http://localhost:8082/api/payments");
```

This endpoint will simply receive HTTP requests on `/api/payments` on the current service 
and forward them to `http://localhost:8082/api/payments` using the *undertow* component under the hood.

You may try it and it should work. But we've **encoded the host name of the target service in the route**.
We should try to do better than this.

## Using property placeholders

A better idea is to write hostnames in the `src/main/resources/application.properties` file.
The content of that file is **not carved in stone**. There are several [options that you can use in Spring-Boot to
override](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) that properties at runtime.  

Let's append the following configuration to our `src/main/resources/application.properties` file:               
                 
```properties
# after path and port configuration

inventory.service=localhost:8081
credit.service=localhost:8082
recommendation.service=localhost:8083
```

Now service hosts and ports have been added to the configuration.

Using configuration values in camel is really easy. Let's **change** the definition
of the `/payments` endpoint into the following:

```java
rest().get("/payments")
        .route()
        .to("undertow:http://{{credit.service}}/api/payments");
``` 

The syntax `{{name-of-the-property}}` can be used almost everywhere in Camel to get any value from
the Spring-Boot configuration.

Now the external service definition looks good. But **we can do better!**

## Using the ServiceCall EIP

Microservices are often deployed into cloud environments where service endpoints are not static but 
**highly dynamic**. Services may be created and destroyed with a high rate, so it's really common to use 
a *"service discovery"* mechanism in the cloud. 

Camel has **built-in support for service discovery**.
Camel applications can discover services using a wide range of providers, like 
*Consul, DNS, Etcd, Zookeeper or also Kubernetes and Openshift (from Camel 2.22.0)*. 

ServiceCall EIP allows you also to set fixed addresses for running the application 
outside a cloud environment, e.g. for local development. 
We'll use this strategy for now, but with the option to **change it in the future by just changing the configuration**. 

Let's configure the `src/main/resources/application.properties` file to add the ServiceCall configuration.

Just, **replace** the content of the `src/main/resources/application.properties` file with the following: 

```properties
camel.component.servlet.mapping.context-path=/api/*
#server.port=8080

# ServiceCall configuration
camel.cloud.service-call.component=undertow

inventory.service=localhost:8081
credit.service=localhost:8082
recommendation.service=localhost:8083

camel.cloud.service-discovery.services[inventory]=${inventory.service}
camel.cloud.service-discovery.services[credit]=${credit.service}
camel.cloud.service-discovery.services[recommendation]=${recommendation.service}
```

We have defined 3 services named *"inventory", "credit" and "recommendation"* and 
defined that we want to contact them using the *"undertow"* (http) component.

Addresses are written in the file, but we have the possibility to leverage service discovery later.

Now, let's **rewrite again** the `/payments` endpoint to user the *ServiceCall EIP*.

```java
rest().get("/payments")
        .route()
        .serviceCall("credit/api/payments");
```

Easy and simple! You're telling Camel that you want to call the *"credit"* service on path `/api/payments`,
everything that is needed to lookup information about the *"credit"* service will be done by Camel.

## Write all other proxy endpoints

We have defined addresses of all services in the `application.properties` file, we can now write the remaining routes
for the *proxy* endpoints.

Add the following endpoints (*inside the `configure()` method, right after the last REST endpoint declaration*):

```java
rest().get("/purchases")
        .route()
        .serviceCall("inventory/api/purchases");

rest().get("/items")
        .route()
        .serviceCall("inventory/api/items");
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
        .serviceCall("credit/api/payments");

// Sub-route for inventory
from("direct:purchaseOrderItems")
        .setHeader("reference", simple("${body.reference}"))
        .split().simple("${body.items}").parallelProcessing()
            .serviceCall("inventory/api/purchases/${header.reference}/items/${body.id}?amount=${body.amount}");
```

We've written 2 sub-routes for making a payment from a order and purchasing all items contained in the order.

Note that **all endpoints are invoked in parallel**, also the calls for different items of the inventory (simulates the case where items are present in different inventories).

**Note**: we have used the simple language ("*${header.reference}*") inside the URI definition of the service call.
This works because the ServiceCall EIP accepts dynamic URIs (it acts [like a like a ".toD()" endpoint](http://camel.apache.org/how-to-use-a-dynamic-uri-in-to.html)).    

## Start the service

This service **depends on all other services** so, before using this service, you must ensure that all other services we have created so far are also running.

You can run all other services by *opening a terminal for each one* (*recommendation*, *credit*, *inventory*), going into their respective base
directory (where each `pom.xml` file is located) and run `mvn clean spring-boot:run`.

We have made sure that each service run on a distinct port so we shouldn't have collisions (we've used *8080, 8081, 8082 and 8083*). 

Now, open another terminal for the *gateway* (go to the gateway root directory), start the app with `mvn clean spring-boot:run` and 
go to the following link: [http://localhost:8080/api/items](http://localhost:8080/api/items)
to check if everything is working fine. You'll see the catalog, proxied from the inventory service. 

## Test the service

**Get Catalog**
```
http GET :8080/api/items
```

Note that this is the same call that we have done to the inventory service (port 8081), but it's done on the gateway here.

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

If using CURL:
```
curl -X POST -d '{"reference": "order-2", "user": "cippalippa", "items": [{"id": "i1", "amount": 3}], "price": 3}' -H "Content-Type: application/json" -w "\n" http://localhost:8080/api/orders
```

After doing the order, check the catalog, purchases and payments again. 