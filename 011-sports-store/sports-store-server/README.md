# ProAngularJS: SportsStore Final application

This directory contains the server side application of SportsStore.

This backend leverages Spring to perform the actions described on the example of the ProAngularJS book.

Securization and Authorization has been performed using Spring Security, with resource protection and Role-based permissions.
    . unauthenticated users can browse the product catalogue and post purchases.
    . authenticated users can review the existing orders
    . administrators can perform CRUD operations on the Products catalogue.

The application does not feature a UI except for a sample JSP page that can be accessed from the root (/) and that displays some information.

Persistence is backed by a MySQL database schema named `sportsStoreBE`.

The application can be started by typing: `mvn spring-boot:run` from your command shell. The application is started on port 9001.