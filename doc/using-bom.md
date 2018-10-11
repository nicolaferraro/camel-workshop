# Apache Camel Workshop: Using Camel BOM

All Camel components are listed in a **BOM** (Bill Of Materials) project that is called
`org.apache.camel:camel-bom`.

Normally, dependencies on a `pom.xml` file are declared as follows: 

```xml
<!-- Inside the <dependencies> tag -->

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

When using the BOM, it's not necessary to specify the version (*2.22.1*) for each dependency and 
also some IDEs will provide autocompletion when adding a new Camel component to the project.

The BOM can be imported using the following declaration:

```xml
<!-- Inside the <project> tag (that is the root of the pom.xml file) -->
<!-- You can put it e.g. right before the <dependencies> tag -->

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-bom</artifactId>
            <version>2.22.1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
``` 

After doing this, you can add Camel dependencies in the `<dependencies>` section without specifying the version.
For example:

```xml
<!-- Inside the <dependencies> tag -->

<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-servlet-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-jackson-starter</artifactId>
</dependency>
```

