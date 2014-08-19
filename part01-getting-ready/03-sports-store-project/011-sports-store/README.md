# ProAngularJS: SportsStore Final application

This directory contains the client and server side of the SportsStore application with the functionalities found in ProAngularJS book. The client side has been slightly modified from what is described in the book, but the server side has been developed from scratch as a Java application using Spring and Hibernate JPA and MySQL as the RDBMS.

In order to run the server you must go into the sports-store-server directory and type:
`mvn spring-boot:run`

This will deploy the application on an embedded Tomcat that can be accessed from `http://localhost:9001`. Note that the server side does not feature any UI apart from a simple HTML page explaining the exposed resources.

The client side can be started by running `grunt serve` from the sports-store-client directory.

This will open an HTML page with links to the Customer and Administration sites.
