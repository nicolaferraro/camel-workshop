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
    <version>2.21.1</version>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-caffeine-starter</artifactId>
    <version>2.21.1</version>
</dependency>
```

They are needed for:
- `camel-hystrix`: we'll use it for circuit breaking
- `camel-caffeine`: we'll use it to do simple caching


## Mix inventory data with recommendations

Let's declare a route that, when called, will fetch data from the recommendation service.
You should add it to the *gateway service*.

```java
from("direct:recommendation")
        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
        .to("undertow:http://{{recommendation.service}}/api/recommendations")
        .unmarshal().json(JsonLibrary.Jackson, List.class);
```

We can now **replace** the `/items` endpoint with the following to include recommendations:

```java
rest().get("/items")
        .route()
        .to("undertow:http://{{inventory.service}}/api/items")
        .unmarshal().json(JsonLibrary.Jackson, Catalog.class)
        .enrichWith("direct:recommendation")
            .body(Catalog.class, List.class, this::recommend)
        .marshal().json(JsonLibrary.Jackson);
```

We use the `recommend()` method present in the class to mix the catalog with the list of items coming from the recommendation service.
That method will set `recommended=true` on featured items.

## Check the new feature

Stop the *gateway service* and start it again. **You should see some stars below the best item of the catalog**.

Nice, but now **if you stop the recommendation service, the ui wont display the items anymore**.

How can we solve this issue?

## Adding a circuit breaker

We can protect the app from failures of the recommendation service by adding a circuit breaker.

Let's wrap the `direct:recommendation` route to add the *Hystrix EIP*:

```java
from("direct:recommendationHystrix")
        .hystrix()
            .to("direct:recommendation")
        .onFallback()
            .setBody(constant(Collections.emptyList()))
        .end();
```

Now replace the call to `direct:recommendation` with a call to `direct:recommendationHystrix`.

```java
// inside get("/items") ....
.enrichWith("direct:recommendationHystrix")
// ...
```

Restart and try again. You'll see no recommendations if the recommendation service is down.

It acts as a standard circuit breaker, e.g. it opens temporarily the circuit if too many request
arrive to the recommendation service and its replies are slow.

## Adding a cache for recommendations

Even with the circuit breaker, "stars" are shown only when the recommendation service is active.
If we shut it down, recommendations are not displayed.

It may be useful to cache them and use the *last cached value as fallback* in the hystrix EIP.

Let's change the `direct:recommendationHystrix` route to include caching using *caffeine*:

```java
from("direct:recommendationHystrix")
        .hystrix()
            .to("direct:recommendation")
            .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_PUT))
            .to("caffeine-cache:global?key=recommendation")
        .onFallback()
            .setHeader(CaffeineConstants.ACTION, constant(CaffeineConstants.ACTION_GET))
            .to("caffeine-cache:global?key=recommendation")
            .choice()
                .when(header("CamelCaffeineActionHasResult").isNotEqualTo(true))
                    .setBody(constant(Collections.emptyList()))
            .end()
        .end();
```

We've used caffeine, but Camel supports **tons of different cache providers**, local (like *Caffeine*, *Ehcache*, ...) or 
also distributed (like *Infinispan*, *Redis*, ...)

Now, you can run the service and if you shut the recommendation service down, the last recommendation is shown.

You can also:
- Set a expiration time on the cached value
- Cache per-user recommendations if your service support them (this is a simplified demo)

