# ProAngularJS: RESTful Application Backend

This directory contains the server side application used for illustrating AngularJS services for REST capabilities.

This backend leverages Spring to perform the actions described on the example that can be found on Chapter 21 of Pro AngularJS book, but using Spring instead of Deployd.

The project does not include no securization or authorization capabilities.

The project includes a CORS filter that allows Cross-Origin Requests. This filter uses an AllowedOriginResolver strategy to decide the allowed origins.

The application does not feature a UI except for a sample JSP page that can be accessed from the root (/) and that displays some information about the REST endpoints defined. The information in that page is static.

Persistence is backed by a MySQL database schema named `RestBackendDB`. 

If you have to customize the datasource or any other application parameters, you must edit the `application.yml` file that can be found under `src/main/resource`.

The application can be started by typing: `mvn spring-boot:run` from your command shell. The application is started on port 9000.