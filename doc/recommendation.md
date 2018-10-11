# Apache Camel Workshop: Recommendation Service

The recommendation service is a **dummy service** in this demo, but I've shown how to create a fully
fledged recommendation system using Apache Camel and Apache Spark on Openshift in 
[some recent talks](https://www.nicolaferraro.me/2017/03/10/voxxed-bucharest-extending-devops-to-big-data-applications-with-kubernetes/)
if you're interested in the topic.

## Creating the project

We'll create a *Camel* on *spring-boot* project:

- Go to [https://start.spring.io](https://start.spring.io)
- Select Spring-Boot version *2.0.5*
- Add to the list of dependencies: `Apache Camel`, `Web`, `DevTools` (for auto-reload, see below)
- Set groupId to `org.apache.camel.workshop` and project name to `recommendation`
- Download the project archive and extract
- Open it in your IDE

The `DevTools` dependency is *optional* but it's often a nice addon during development, especially for the **auto-reload** feature.
You can keep your application running (see the final part of this section for how to do it)
while changing your code: each time you save and recompile using your IDE, the running application is reloaded automatically and you see
the changes immediately. 

You can run the following command from the root directory of the project (where `pom.xml` is located) to do a first build.

```
mvn clean install
```

Dependencies are downloaded from Maven repositories, tests are executed (they should pass),
then a standalone *fat-jar* is created in the `target` directory.

The `fat-jar` contains all required dependencies and is runnable (you can run it with `java -jar ./target/recommendation-0.0.1-SNAPSHOT.jar` if you want, but we haven't added any code yet).

## Adding a "Hello World" route

The timer is the simplest component that you may want to use.
We'll add a simple timer to check that the application is working.

Open the `RecommendationApplication` class and **right after the main method** put the following code:


```java
@Component
public static class Routes extends RouteBuilder {

    @Override
    public void configure() {

        from("timer:hello?period=3s")
                .log("Hello world!");

    }

}
```

Add the necessary imports, your IDE should suggest them.
Now from the root of the project (where `pom.xml` is located) run the application with:
 
```
mvn clean spring-boot:run
```

## Adding the recommendation service

In order to expose a rest service you need first to add a Camel component that
supports the REST DSL. Camel has multiple components, but when running on a service
with the spring-web module, the best choice is the `camel-servlet` component, together with `camel-jackson` for Json support.

Add the following to the `pom.xml`:

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
```

Camel ships also a **BOM** (Bill Of Materials) that helps to manage automatically dependency versions.
[Follow this section if you want to know more](using-bom.md) about this feature. 


Now replace the hello world route with the rest route.

```java
@Component
public static class Routes extends RouteBuilder {

    @Override
    public void configure() {

        restConfiguration().bindingMode(RestBindingMode.json);

        rest().get("/recommendations")
                .route()
                .setBody(constant(Collections.singletonList("i99")))
                .log("Recommending ${body}");

    }

}
``` 

It's a fake recommendation suggesting only item with id `i99` (you'll see what it is).

Camel will expose the endpoint on the URL: `http://localhost:8080/camel/recommendations`.
For this demo, **we want to use a different context path**, so we configure it on the `application.properties` file.

We want also to start multiple endpoints on the same development machine, so we set the **server port to 8083** for this service.

Edit the `src/main/resources/application.properties` file and put the following:

```properties
camel.component.servlet.mapping.context-path=/api/*
server.port=8083
``` 

**Note**: Some IDE, like IntelliJ IDEA Ultimate, provide autocompletion of available properties.

## Start the service

Start the app with `mvn clean spring-boot:run` and go to the following link: [http://localhost:8083/api/recommendations](http://localhost:8083/api/recommendations).

You'll see the recommendations as json data.

You can stop the service by just pressing `ctrl + c` on the terminal that started the application.
