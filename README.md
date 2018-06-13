# Apache Camel Workshop

This is a Apache Camel Workshop "from zero to hero".
It starts from basic features, like how to expose a REST endpoint, to building a 
complex system composed of multiple microservices and coordinating actions
using the *Saga* pattern to obtain consistency.

All artifacts produced in the workshop are present under the /[app](/app) directory, but we suggest 
to follow the step-by-step guide.

## Slides

The slides for this workshop are [located here](/doc/slides.pdf).

## Final Result

You can check the [Youtube video](https://youtu.be/hBbGXnb0N7A) to see all services in action.

The final result of the workshop is a "Plush Shop Demo".

![Plush Shop Catalog](/doc/catalog.png "Plush Shop Catalog")


A demo user can make purchases on the Plush Shop, if he has enough credit...

![Plush Shop Purchase](/doc/purchases.png "Plush Shop Purchases")

## Architecture

The system is composed of a Angular 6 UI interface backed by **4** microservices.

![Plush Shop Architecture](/doc/camel-workshop-architecture.png "Plush Shop Architecture")

The role of each service is:
- **UI** (Angular 6 on Node.js or any static HTTP server): a graphical user interface that is provided for the workshop and can
be used to test the full application; 
- **Recommendation** (Camel on Spring-Boot): a simple recommendation service that provide ratings for the best items;
- **Credit** (Camel on Spring-Boot): manages how much money is owned by the user(s);
- **Inventory** (Camel on Spring-Boot): manages items present in stock and movement out of it;
- **Gateway** (Camel on Spring-Boot): provides uniform access to all other services and orchestrates calls to them.

## Requirements

- Java 8
- Maven 3.5.x
- Your favourite IDE
- HTTPie (to test endpoints)
- Minishift and Openshift client tools (optional)

HTTPie can be [installed on Linux, OSX and Windows](https://httpie.org/doc#installation).

**For Windows users:** Installation of HTTPie on Windows requires `pip` that is included in the [Python installer](https://www.python.org/downloads/windows/). 
Read [this thread](https://stackoverflow.com/questions/4750806/how-do-i-install-pip-on-windows) if you need to troubleshoot.
Alternatively, you can use a graphical tool like [Postman](https://www.getpostman.com/) to test endpoints, but instructions
on this tutorial are given for **HTTPie** only. 

The **Minishift requirement is optional**. Minishift allows you to start full Openshift pseudo-cluster in your 
development machine and run your service as containerized images. 
You can [download the binary from the Minishift release page](https://github.com/minishift/minishift/releases/tag/v1.18.0).

Refer to the ["quick start guide"](https://docs.openshift.org/latest/minishift/getting-started/index.html) to install Minishift on your laptop.
[The section about the Openshift client binary](https://docs.openshift.org/latest/minishift/openshift/openshift-client-binary.html) explains also how to 
include the `oc` binary into the path in order to interact with the cluster.

## Part 1: writing the services

### 1. Recommendation Service

[Here's how to create the recommendation service](/doc/recommendation.md).

### 2. Credit Service

[Here's how to create the credit service](/doc/credit.md).

### 3. Inventory Service

[Here's how to create the inventory service](/doc/inventory.md).

### 4. Gateway Service

[Here's how to create the gateway service](/doc/gateway.md).

### 5. Running the UI

[Here's how to run the UI](/doc/ui.md).

## Part 2: advanced features

### 6. Circuit breaking and Caching

[Let's add a circuit breaker and caching logic](/doc/circuit-breaker.md).

### 7. Adding Sagas

[Let's see how to fix inconsistencies](/doc/saga.md).

### 8. Running on Kubernetes and OpenShift (Optional)

[Let's see how to run everything on Kubernetes and Openshift](/doc/openshift.md).
