# Apache Camel Workshop: Circuit Breaking and Caching

So far the gateway application is mostly a dumb proxy (except for the order service), we are
going to make it more complex by mixing inventory data with recommendations.

We'll **make changes only to the gateway service** in the next sections.

## Add dependencies to the Gateway service

We need the following dependencies in the gateway.

```xml
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-hystrix-starter</artifactId>
    <version>2.22.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-caffeine-starter</artifactId>
    <version>2.22.1</version>
</dependency>
```

They are needed for:
- `camel-hystrix`: we'll use it for circuit breaking
- `camel-caffeine`: we'll use it to do simple caching


## Mix inventory data with recommendations

Let's declare a route that, when called, will fetch data from the recommendation service.
You should add it to the *gateway service* (*inside the `configure()` method*).

```java
from("direct:recommendation")
        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
        .serviceCall("recommendation/api/recommendations")
        .unmarshal().json(JsonLibrary.Jackson, List.class);
```

We can now **replace** the `/items` endpoint with the following to include recommendations:

```java
rest().get("/items")
        .route()
        .serviceCall("inventory/api/items")
        .unmarshal().json(JsonLibrary.Jackson, Catalog.class)
        .enrichWith("direct:recommendation")
            .body(Catalog.class, List.class, this::recommend)
        .marshal().json(JsonLibrary.Jackson);
```

We use the `recommend()` method present in the class to mix the catalog with the list of items coming from the recommendation service.
That method will set `recommended=true` on featured items.

## Check the new feature

We assume that all backend services are still running (start them if they are stopped).
 
Stop the *gateway service* and start it again in order to apply changes. **If you look at the UI, you should see some stars below the best item of the catalog**.

Nice, but now **if you stop the recommendation service, the ui wont display the items anymore** if you refresh it (other errors may appear due to the missing catalog).

How can we solve this issue?

## Adding a circuit breaker

We can protect the app from failures of the recommendation service by adding a circuit breaker.

Let's **rewrite** the `direct:recommendation` route to add the *Hystrix EIP*:

```java
from("direct:recommendation")
        .hystrix()
            .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
            .serviceCall("recommendation/api/recommendations")
            .unmarshal().json(JsonLibrary.Jackson, List.class)
        .endHystrix()
        .onFallback()
            .setBody(constant(Collections.emptyList()))
        .end();
```

Note the difference with the previous code: the *hystrix()* EIP has been added around the call to the recommendation service and in the last part of the route we have added a fallback strategy that should be used when the recommendation service is not available (return a *empty* recommendation).

Now, **restart the gateway service** and try again. You'll see no recommendations if the recommendation service is down.

It acts as a standard circuit breaker, e.g. it opens temporarily the circuit if too many request
arrive to the recommendation service and its replies are slow.

## Adding a cache for recommendations

Even with the circuit breaker, "stars" are shown only when the recommendation service is active.
If we shut it down, recommendations are not displayed.

It may be useful to **cache recommendations** and use the *last cached value as fallback* in the hystrix EIP.

Let's **change** the `direct:recommendation` route to include caching using *caffeine*:

```java
from("direct:recommendation")
        .hystrix()
            .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
            .serviceCall("recommendation/api/recommendations")
            .unmarshal().json(JsonLibrary.Jackson, List.class)
            .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_PUT))
            .setHeader(CaffeineConstants.KEY, constant("recommendation"))
            .to("caffeine-cache:global")
        .endHystrix()
        .onFallback()
            .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_GET))
            .setHeader(CaffeineConstants.KEY, constant("recommendation"))
            .to("caffeine-cache:global")
            .choice()
                .when(header("CamelCaffeineActionHasResult").isNotEqualTo(true))
                    .setBody(constant(Collections.emptyList()))
            .end()
        .end();
```

We've used caffeine, but Camel supports **tons of different cache providers, local** (like *Caffeine*, *Ehcache*, ...) or 
also **distributed** (like *Infinispan*, *Redis*, *Hazelcast* ...).

Using a **distributed cache** with *camel-infinispan* (or *camel-redis*, *camel-hazelcast*, ...) we can also substantially reduce the amount of requests forwarded to 
downstream services. When data rarely changes this is absolutely useful to improve system **scalability**.

Caches in Camel have a lot of options to configure, like *data expiration* and *invalidation*.  

Now, you can run all services and refresh the UI. If you shut the recommendation service down, 
the **last cached recommendation is shown** in the UI.
