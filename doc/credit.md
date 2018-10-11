# Apache Camel Workshop: Credit Service

The credit microservice manages payments done by the users.
Each user is given a credit of $30 and can make payments to buy items from the store.

The credit microservice expose REST API to manage payments. 


## Creating the project

We'll create a *Camel* on *spring-boot* project:

- Go to [https://start.spring.io](https://start.spring.io)
- Select Spring-Boot version *2.0.5*
- Add to the list of dependencies: `Apache Camel`, `Web`, `DevTools` (for auto-reload)  
- Set groupId to `org.apache.camel.workshop` and project name to `credit`
- Download the project archive and extract
- Open it in your IDE

As done for the previous service, you can do a first build from the root directory of the project (where `pom.xml` is located) with the command:

```
mvn clean install
```

## Adding the business logic and supporting beans

We'll not write the business logic, instead we'll start from existing classes and we'll wire APIs.

Download the supporting classes from here and place them in the `org.apache.camel.workshop.credit` package:

- [Payment.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/credit/src/main/java/org/apache/camel/workshop/credit/Payment.java) (a bean)
- [CreditStore.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/credit/src/main/java/org/apache/camel/workshop/credit/CreditStore.java) (Credit store interface)
- [CreditStoreImpl.java](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/credit/src/main/java/org/apache/camel/workshop/credit/CreditStoreImpl.java) (Credit store implementation)

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
    <artifactId>camel-bean-validator-starter</artifactId>
    <version>2.22.1</version>
</dependency>
```

We have seen the first two dependencies in the `recommendation` service. 

The `camel-bean-validator-starter` dependency will be used to validate the input in some services. 

## Adding a endpoint to LIST Payments

Create a empty `CreditRoutes` class:

```java
package org.apache.camel.workshop.credit;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.model.rest.RestParamType;
import org.springframework.stereotype.Component;

@Component
public class CreditRoutes extends RouteBuilder {

	@Override
	public void configure() {

		// routes here

	}

}
```

We will fill that class with all REST routes that we need.
Add a `GET` endpoint like this:

```java
rest().get("/payments")
        .route()
        .bean("creditStore", "list")
        .marshal().json(JsonLibrary.Jackson);
```

When Camel receives a request to list payments, we'll call the `list` method on the `creditStore` bean.
The bean is published in the spring-boot registry and Camel retrieve it from there.

The `marshal()` operation is used here to convert the `List<Payment>` into the JSON format before sending it on the wire.

Now, configure the server port (**8082** for this service) and the context path in the `src/main/resources/application.properties` file:

```properties
camel.component.servlet.mapping.context-path=/api/*
server.port=8082
```

You can now run the service with `mvn clean spring-boot:run`.
The service is available in [http://localhost:8082/api/payments](http://localhost:8082/api/payments).

## Adding a endpoint to CREATE Payments

When submitting a Payment, the client sends a JSON object and we must process it.

Let's add the following route (*inside the `configure()` method, right after the previous `rest()` declaration*):

```java
rest().post("/payments")
        .route()
        .unmarshal().json(JsonLibrary.Jackson, Payment.class)
        .to("bean-validator:validatePayment")
        .bean("creditStore", "add")
        .marshal().json(JsonLibrary.Jackson);

```

First of all, Camel `unmarshal()` the JSON object to convert it to a Java bean.

Then, we call the `bean-validator:validatePayment` endpoint. It's a Camel endpoint that 
does bean validation (of `javax.validation` constraints annotations). [Documentation of the 
bean-validator component is here](https://github.com/apache/camel/blob/master/components/camel-bean-validator/src/main/docs/bean-validator-component.adoc).

If you look at the `Payment` class, you'll notice it's prefilled with validating annotations:

```java
public class Payment {

    @NotNull
    private String reference;

    @NotNull
    private String user;

    @NotNull
    @Min(0)
    private Integer amount;
//...
```

After validating the bean, we send it to the `add` method of the `creditStore`.
We `marshal()` the response to JSON (we echo the input data).

## Adding a endpoint to DELETE Payments

Payments sometimes should be cancelled because of errors, so we add a specific endpoint for that (*inside the `configure()` method, right after the previous `rest()` declaration*).

```java

rest().delete("/payments/{ref}")
        .param()
            .name("ref")
            .type(RestParamType.path)
            .description("Reference code")
        .endParam()
        .route()
        .bean("creditStore", "remove(${header.ref})");
```

We use here a *path parameter* and we can declare it before the route.
Describing path parameters is useful especially when we want to publish the Swagger/OpenAPI specs,
but also help to make the code cleaner.

The `{ref}` parameter will be mapped by Camel in a header and we use it to call the `remove` method on the `creditStore` bean.

Note the new syntax used to pass the parameter: `remove(${header.ref})`.


## Start the service

Start the app with `mvn clean spring-boot:run` and go to the following link: [http://localhost:8082/api/payments](http://localhost:8082/api/payments)
to check if everything is working fine.


## Test the service

If you have HTTPie installed you can test the following calls.

**List payments**
```
http GET :8082/api/payments
```

**Create a invalid payment**
```
echo '{"reference": "ref1", "user": "nicola", "amount": -2}' | http POST :8082/api/payments
```

If you want to use CURL instead of HTTPie:
```
curl -X POST -d '{"reference": "ref1", "user": "nicola", "amount": -2}' -H "Content-Type: application/json" -w "\n" http://localhost:8082/api/payments
```

You should see a error coming back from the service.

**Create a valid payment**
```
echo '{"reference": "ref1", "user": "nicola", "amount": 1}' | http POST :8082/api/payments
```

If using CURL:
```
curl -X POST -d '{"reference": "ref2", "user": "nicola", "amount": 1}' -H "Content-Type: application/json" -w "\n" http://localhost:8082/api/payments
```

**Delete a payment**
```
http DELETE :8082/api/payments/ref1
```

