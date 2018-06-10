# Apache Camel Workshop: Saga

One of the most difficult problems to solve in a Microservice architecture is: 
**how do we obtain consistency in a highly distributed system?**

Just make the following test:
- Open two tabs in a browser
- On the first tab, buy all items present in stock for a plush
- On the second tab (not synchronized), try to buy the same plush and others

What you see is called **inconsistency** and fixing it is really hard... without Camel!

## Declaring a Saga

You can declare the POST `/order` action to be part of a Saga. All actions belonging to a saga are 
*compensated* in case of issues when executing the normal workflow.

We can define the saga in the **gateway service**.

First, let's define the type of Saga service we want to use:

```java
// below rest configuration, inside the configure() method, put
getContext().addService(new InMemorySagaService(), true);
```

A `InMemorySagaService` is a Saga service that keeps its state in memory. 
This means that it's able to maintain consistency, but if you shut down the *gateway*
all information about in-flight sagas is lost.

Camel of course has other options that survive failures (see [camel-lra](https://github.com/apache/camel/blob/master/components/camel-lra/src/main/docs/lra.adoc)).

Now let's wrap the create-order service with a `saga` processor:

```java
rest().post("/orders")
        .type(Order.class)
        .route()
        .saga()
            .compensation("direct:cancelOrder")
            .option("order", simple("${body}"))
                .unmarshal().json(JsonLibrary.Jackson, Order.class)
                .to("bean-validator:validateOrder")
                .multicast().parallelProcessing()
                    .to("direct:payOrder")
                    .to("direct:purchaseOrderItems")
                .end()
                .marshal().json(JsonLibrary.Jackson)
        .end();
```  


Note that we have declared the action to execute in case of failure of the saga main action, 
that is `direct:cancelOrder`.

Camel will pass to that route the order received from the UI in the `order` header.

Let's write the **compensating action**:

```java
from("direct:cancelOrder")
        .setBody(header("order")).convertBodyTo(String.class)
        .unmarshal().json(JsonLibrary.Jackson, Order.class)
        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.DELETE))
        .multicast().parallelProcessing()
            .serviceCall("credit/api/payments/${body.reference}")
            .serviceCall("inventory/api/purchases/${body.reference}");
```

We'll cancel both payment and purchase **in parallel**.

If the `direct:cancelOrder` operation will fail, the Saga service will retry again, up to a configurable number of attempts.
This means also that the compensating action must be:
- **Idempotent**: multiple compensations must have the same result as one compensation 
- **Commutative**: if compensation happens *before* the normal action for some network issue, the service should refuse to execute the normal action (considering it already compensated).

If you look at the *credit service* and *inventory service*, you'll see that the implementation of the business logic services
take into account these two properties. And it wasn't so difficult to implement them...


Now, considering that the business logic invariants are:
- **You cannot spend more than $30**
- **You cannot buy a item if it's not present in stock**

**If you don't respect one of them, your order will be automatically canceled.**

You may see that the order is not canceled immediately, but sometimes you need to refresh the page to see
the result. That is what we call **eventual consistency**.

**Important Note**: The *"eventual"* word in *"eventual consistency"* does not mean that *"there's eventuality that the result will be consistent"*, 
it means *"at one time in the future the result will be consistent for sure, but we it will not happen immediately in some cases (network partitions)"*.



