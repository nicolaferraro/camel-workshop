# Apache Camel Workshop: Running in Kubernetes and Openshift

We are going to Containerize all services and run them on Openshift.
Running a set of related services on Kubernetes or Openshift usually requires some 
additional work, but there are tools that make your life really easy and we're going to use them.

**Note**: refer to the [first part of the tutorial for installation instructions](/README.md) 
of Minishift and the `oc` binary. 

## Setting up the local Openshift cluster

Ensure all services are not running, since the operations we are going to do next will start 
again all services on the local Minishift (you should not have infinite resources on your laptop).

To start Minishift execute the following command:

```
minishift start
```

Usually you're logged in into the cluster, but in case your credential are expired you can
use the following command to login again:

```
oc login https://$(minishift ip):8443
# then use `developer` as user and `x` as password (any password is ok)
```

Minishift usually creates a default project called `myproject`.
A project is a private namespace where you can deploy related services running as containers.
We are going to create a new project for our workshop:

```
oc new-project workshop
```

The `oc` binary is now also configured to use the `workshop` project by default. You can check what's inside the project by using:

```
oc get all
```

## Open the Openshift console

You can see what will happen next from a graphical user interface.

Type the following on the terminal:

```
minishift console
```

Your browser will open the Openshift console corresponding to the Minishift instance.
Login with the same credentials used before and navigate to the `workshop` project (that should be empty).

## Adding the Fabric8 Maven Plugin and deploying

Let's start adding a plugin to to deploy all services on Openshift.
We'll do it **first for credit, inventory and recommendation**, then we'll do a customized 
configuration for the gateway.

In the `pom.xml` file of credit, inventory and recommendation add the following declaration at the end of the file (right **before** the `</project>` closing tag):

```xml
<profiles>
    <profile>
        <id>openshift</id>

        <build>
            <plugins>
                <plugin>
                    <groupId>io.fabric8</groupId>
                    <artifactId>fabric8-maven-plugin</artifactId>
                    <version>3.5.39</version>
                    <executions>
                        <execution>
                            <goals>
                                <goal>resource</goal>
                                <goal>build</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```


It adds a profile called "openshift" that, when activated, binds the "fabric8-maven-plugin" to the build lifecycle of each project.


After adding the profile declaration, execute the following command to **containerize each service and run it on Openshift** 
(execute it 3 times, from the root of the credit, inventory and recommendation services respectively):

```
mvn clean fabric8:deploy -P openshift
```

With this simple command:
- The service is packaged into a container image with a Java base image customized for Camel Spring-Boot applications
- The image is pushed into the Openshift internal registry
- A Openshift Deployment is created, referencing the application image
- A Openshift Pod with a single container is created automatically by Openshift
- Openshift then starts the container with our app running inside

After you execute the command for all 3 services, look at the Openshift console, you should see that all services are running. 

## Configuring the Fabric8 Maven Plugin in the Gateway Service

The gateway service requires a bit of configuration of the Fabric8 maven plugin.

Add the following declaration to the `pom.xml` file of the gateway service (right **before** the `</project>` closing tag):

```xml
<profiles>
    <profile>
        <id>openshift</id>

        <build>
            <plugins>
                <plugin>
                    <groupId>io.fabric8</groupId>
                    <artifactId>fabric8-maven-plugin</artifactId>
                    <version>3.5.39</version>
                    <executions>
                        <execution>
                            <goals>
                                <goal>resource</goal>
                                <goal>build</goal>
                            </goals>
                        </execution>
                    </executions>
                    <configuration>
                        <resources>
                            <env>
                                <INVENTORY_SERVICE>inventory:8081</INVENTORY_SERVICE>
                                <CREDIT_SERVICE>credit:8082</CREDIT_SERVICE>
                                <RECOMMENDATION_SERVICE>recommendation:8083</RECOMMENDATION_SERVICE>
                            </env>
                        </resources>
                    </configuration>
                </plugin>
            </plugins>
        </build>

    </profile>
</profiles>
```

It's the same as for the other services, but we ask the plugin to set 3 environment variables in the container.
That variables are meant to override the service settings in the `application.properties` file.
E.g. the `INVENTORY_SERVICE` environment variable in the container will replace the `inventory.service` property in `application.properties` file.

This way of overriding properties in containers is very common and can be used for general purpose configuration too.
Naming conventions are described in the [spring-boot externalized configuration guide](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html).

**Note:** From Camel 2.21.2 the ServiceCall EIP has been enhanced to support natively 
Kubernetes and Openshift. Overriding the target URL of the services will not be necessary, 
since the ServiceCall EIP implementation in *camel-kubernetes* will auto-discover them.

To deploy the gateway service you can run the same command that you used for the other services:

```
mvn clean fabric8:deploy -P openshift
```

You should see it running.


## Running the UI on Openshift

The UI has been prepackaged into a docker container image and pushed to Docker Hub under the name `nferraro/camel-workshop-ui:latest`.

Openshift resources have already been prepared for the UI container.
**You can download** the Openshift files from here (*right click, save as...*): [openshift-ui.yaml](https://raw.githubusercontent.com/nicolaferraro/camel-workshop/master/app/ui/openshift-ui.yaml)

Put it somewhere in your file system and, *from the dir where the file is located*, in the terminal execute the following command:

```
oc create -f openshift-ui.yaml
```

This will create all Openshift resources to run the UI. The docker image will be downloaded by Openshift from Docker Hub and executed.

The `yaml` file defines also a Openshift *Route* that allows you to open the UI in a browser.
The URL is displayed in the Openshift console overview, next to the UI deployment you've just created.

Click on the UI link, you should be able to see the full containerized system running on Openshift.  

## Adding health checks

Camel and Spring-Boot declare some health checks that tell the cloud platform if the pod is running correctly.

If the pod does not start or has some misconfiguration, for example, one might want to fix the problem before the application is running in production.

Health checks are activated automatically if you include in your application the Spring-Boot **actuator module**.
The Fabric8 Maven Plugin detects this configuration and add **readiness and liveness probes** into the Openshift resources.

All you need to do is to add the following dependency in the `pom.xml` file of the services.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Version is resolved by the spring-boot parent project.

You can now redeploy each service using the usual command:

```
mvn clean fabric8:deploy -P openshift
```

You'll notice that Openshift does a **rolling upgrade** of the pods, but it does not replace the
old pods until the application is fully started without issues, thanks to checks embedded by Camel and Spring-Boot 
into the actuator module.

The new application is marked with *light-blue* color before it's fully running, then it becomes *dark-blue*. 

