# Apache Camel Workshop: UI

The UI for the workshop is provided and can be used as is.

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

## Source code
The source code of the UI is contained in [app/ui](/app/ui) and can be run from there using `ng serve --open`.