# Apache Camel Workshop

This is a Apache Camel Workshop "from zero to hero".
It starts from basic features, like how to expose a REST endpoint, to building a 
complex system composed of multiple microservices and coordinating actions
using the *Saga* pattern to obtain consistency.

All artifacts produced in the workshop are present under the /[app](/app) directory, but we suggest 
to follow the step-by-step guide.   

## Final Result

The final result of the workshop is a "Plush Shop Demo".

![Plush Shop Catalog](/doc/catalog.png "Plush Shop Catalog")


A demo user can make purchases on the Plush Shop, if he has enough credit...

![Plush Shop Purchase](/doc/purchases.png "Plush Shop Purchases")

## Architecture

The system is composed of a Angular 6 UI interface backed by **4** microservices.

![Plush Shop Architecture](/doc/camel-workshop-architecture.png "Plush Shop Architecture")

The role of each service is:
- **Recommendation**: a simple recommendation service that provide ratings for the best items;
- **Credit**: manages how much money is owned by the user(s);
- **Inventory**: manages items present in stock and movement out of it;
- **Gateway**: provides uniform access to all other services and orchestrates calls to them.

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
