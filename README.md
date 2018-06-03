# Apache Camel Workshop

This is a Apache Camel Workshop "from zero to hero".
It starts from basic features, like how to expose a REST endpoint, to building a 
complex system composed of multiple microservices and coordinating actions
using the *Saga* pattern to obtain consistency.

All artifacts produced in the workshop are present under the /[app](/app) directory, but we suggest 
to follow the step-by-step guide.   

## Final Result

The final result of the workshop is a "Plush Shop Demo".

**TODO: ADD A PICTURE**

## Architecture

**TODO: EXPLAIN ARCHITECTURE**

## Requirements

- Java 8
- Maven 3.5.0
- Your favourite IDE
- HTTPie (to test endpoints)

## Let's start

### Recommendation Service

[Here's how to create the recommendation service](/doc/recommendation.md).

### Credit Service

[Here's how to create the credit service](/doc/credit.md).

### Inventory Service

[Here's how to create the inventory service](/doc/inventory.md).

### Gateway Service

[Here's how to create the gateway service](/doc/gateway.md).

### Running the UI

[Here's how to run the UI](/doc/ui.md).

### Circuit breaking and Caching

[Let's add a circuit breaker and caching logic](/doc/circuit-breaker.md).

### Adding Sagas

[Let's see how to fix inconsistencies](/doc/saga.md).
