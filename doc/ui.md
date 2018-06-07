# Apache Camel Workshop: UI

The UI for the workshop is based on Angular 6. It is *provided* and can be used as is.

## The quick way
The quickest way to see the ui is to navigate to: [https://camel-workshop.nicolaferraro.me/](https://camel-workshop.nicolaferraro.me/).
Since we have enabled CORS for all URLs, the browser is allowed to contact localhost, even if the website is hosted on a remote URL.


## The manual way
If you want to run the UI yourself, you can download a spring-boot packaged UI.

Download the [camel-workshop-spring-boot-ui.jar from here](https://github.com/nicolaferraro/camel-workshop/releases/download/v0.0.1/spring-boot-ui-0.0.1.jar).

From the folder containing the jar execute:

```
java -jar spring-boot-ui-0.0.1.jar 
```

The application is available at the following URL: [http://localhost:4000/](http://localhost:4000/).

## Angular UI Source code
The source code of the UI is contained in [app/ui](/app/ui) and can be run from there using the following command:

```
npm install
ng serve --open
```

It requires that [Node JS](https://nodejs.org/en/download/), [npm](https://docs.npmjs.com/cli/install) and [Angular CLI](https://cli.angular.io/) are installed.

## Spring-Boot UI source code

The source code of the spring-boot based UI mentioned above is here: [/app/spring-boot-ui](/app/spring-boot-ui).
 
 does not contain the Angular source code but but a compiled version of it.
 The compiled version is static (no server code, only javascript running on the browser side) and can be obtained using the following command:
 
 ```
 # from app/ui
 npm install
 ng build
 ```
 
The compiled version of the ui is placed by `ng` in the `app/ui/dist` directory.
The content of that directory has been copied into [/app/spring-boot-ui/src/main/resources/static](/app/spring-boot-ui/src/main/resources/static) directory and is
served automatically by spring-boot when running the application.

An equivalent way to run the spring-boot UI application is to clone this repository and run `mvn clean spring-boot:run` from the [/app/spring-boot-ui](/app/spring-boot-ui) directory.
 
