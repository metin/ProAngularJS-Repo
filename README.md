# ProAngularJS

Examples and Concepts from ProAngularJS book

# Concepts
AngularJS delivers the kind of functionality that used to be available only to server-side developers, but entirely in the browser.

## MVC Pattern
The key to applying MVC pattern successfully is to implement the key premise of a separation of concerns, by decoupling the data model in the application from the behavior and presentation logic.
In client-side web app development this is:
    . data
    . logic that operates on the data
    . HTML elements and templates used to display the data

## DOM
When the browser loads and processes an HTML document, it creates the Document Object Model (DOM). The DOM is a model in which JavaScript objects are used to represent each element in the document, and the DOM is the mechanism by which you can programmatically engage with the content of an HTML document.

## Bootstrap Grids
Bootstrap provides style classes that can be used to create different kinds of grid layout, ranging from one to twelve columns and with support for responsive layouts.
See the example 004-bootstrap-grids

## Angular JavaScript Utility Methods

Angular provides several utility methods that complement out-of-the-box JavaScript capabilities:
    . angular.isFunction: returns true if a given object is a function. This can be useful in situations where you receive an argument function, to prevent applying the received argument when it is not a function.

    . angular.isString(object) : returns true if the argument is a string, false otherwise.
    . angular.lowercase(string) : returns a lowercase version of the given argument
    . angular.uppercase(string) : returns a uppercase version of the given argument

    . angular.isNumber(arg) : returns true if the given argument is a number

    . angular.extend(objExt, objSrc) : lets you extend objExt with the properties of objSrc. If a property is objExt has the same name as one in objSrc, the one in objSrc prevails.

    . angular.isObject(arg) : returns true if the given argument is an object

    . angular.forEach(obj, function(value, key){...}) : lets you apply a function to each of the properties of obj

    . angular.isArray(arg) : returns true if arg is an array

    . angular.forEach(array, function(value, index?){...}) : lets you iterate over an array while applying the given function to each of the elements of the array.

    . angular.isDefined(arg) : returns true if the argument is not undefined (null arg returns true) 
    . angular.isUndefined(arg) : returns true if the argument is undefined (null arg returns false)

## Promises
Promises are the JavaScript way of representing an item of work that will be performed asynchronously and that will be completed at some time in the future. The most common way to encounter promises is by making Ajax requests: the browser makes the HTTP request in the background and uses a promise to notify your application when the request has completed.
Example syntax is:
    var promise = $http.get('todo.json');   // create a promise obj associated to the retrieval of todo.json 
    promise.success(function (data) {       // when request is completed successully execute the given function
        ...
    }); 

The $http.get method returns a promise object that you can use to register a callback function that will be invoked when the request has been completed.

Then methods defined by a Promise object are:
    . error(callback) : specifies a callback function that will be invoked if the Promise cannot be completed.
    . success(callback) : specifies a callback function that will be invoked when the work represented by the Promise is completed.
    . then(success, err): specifies callbacks that will be invoked if the Promise succeeds or fails.

In the case of $http operations, the success callback is passed the data retrieved from the server and the error callback is passed the details about the problem that was encountered.

The three methods return other Promise objects, allowing asyn tasks to be chained together in sequence.
Example (chaining:)
        $http.get('todo.json').then(function (response) { 
            $scope.todos = response.data;
        }, function () {
            $scope.todos.push({action: 'error encountered while reading data from the server'});
        }).then(function() {
            $scope.todos.push({action: 'Request complete', done: true});
        });

The first time then() is used to handle the request response from $http.get(). The second one is used to perform additional actions, but only when the other has completed.

## JSON
The JavaScript Object Notation has become the de facto standard data format for web apps. JSON is easy to work with but you can still get into trouble because JSON libraries encode and decode JSON slightly different - a problem that can manifest if the client and server side of your application are developed using different programming languages.

Angular makes working with JSON simple:
    . When you request JSON via AJAX, the response will be parsed automatically into JavaScript objects and passed to the success function.
    . Additionally, angular provides angular.toJson and angular.fromJson to explicitly encode and decode JSON data.

# Examples

000-hello-angular: Serves as a check that the template project is correctly working. It includes Angular and Bootstrap as bower components. The application displays a list of things to do.

001-todo-app: The ToDoApp version 1 that covers in a very lightweight way the following topics:
    . modules
    . controllers
    . filters: custom and built-in
    . two-way databinding
    . directives: ng-hide, ng-class, ng-submit, ng-repeat
    . form validation

002-todo-app-http-service: This is version 2 of 001-todo-app. The only addition is the utilization of the $http service to retrieve the task information from a json file.

003-todo-app-final: This is the final version of 001-todo-app in which there is no additions but the contents are refactored to create neater code.

004-bootstrap-grids: An example of different types of Bootstrap grids.

005-javascript-angular-basics: An example of some of the Angular utility methods that complement JavaScript, such as angular.forEach, angular.extend, etc. All the functionality is embedded inside the app.run method.

006-angular-promises-basics: Illustrates how to work with Promise objects and angular. The application performs a simple Ajax request to retrieve a JSON file and uses promises to handle success and error responses.

007-sports-store: Implementation of the SportsStore application with the functionalities described on Chapter 6:
    . Data is defined statically in the app-controller.js
    . Product Catalog can be filtered by Category
    . Pagination available, 3 products per page

Additionally, several functional enhancements have been performed:
    . the $scope service is not used, data is defined as a property of the controller
    . files are organized according to AngularJS' best practices

008-sports-store: Implementation of the SportsStore application with the functionalities described on Chapter 7:
Note that some of the pieces have been refactored according to AngularJS' best practices.

New Functionality includes:
    . Error management: a random error function is created to fabricate communication errors.
    . Cart Module: includes a singleton service 'cart' and a cart-summary directive and a controller.
    . URL Routes: now views are controlled using angular-route. Those are defined in the app.js module. Note that as an SPA urls are defined as http://localhost:5000/#/checkout http://localhost:5000/#/products etc. to avoid making the browser reload the entire application and thus lose all the changes.

009-sports-store: Implementation of the SportsStore application with the functionalities described on Chapter 8 up to the Making Improvements section. No backend has been defined.
    New functionality includes:
    . Form management and validation

010-sports-store: In this project we create a Java BE application for the SportsStore. The BE is based in the Spring in Practice Boot examples (chapter07-005-view-authorization-using-acls), and most of the classes are still there for reference.
The client application is the one described on Chapter 8, from the Making Improvements section.
The ones that are related to the SportsStore app are listed here:
    . SecurityConfig: Modified to allow reaching the endpoints of SportsStoreBE and allow Login page.
    . WebMvcConfig: Modified to redirect '/' to the store and '/admin' to the administration application
    . Category: the domain class for the Product category
    . Product: the domain class for the Product
    . Order: the domain class for the Customer Order
    . LineItem: the domain class for each of the components of a Customer Order
    . CategoryRepository: The Spring Data Repository interface for Category class
    . ProductRepository: The Spring Data Repository interface for Product class
    . OrderRepository: The Spring Data Repository interface for Order class
    . AjaxAuthenticationFailureHandler: as login is received as an Ajax request, this class handles authentication failures.
    . AjaxAuthenticationSuccessHandler: as login is received as an Ajax request, this class handles authentication success.
    . OrderService: Handles Order related business logic
    . ProductService: Handles Product related business logic
    . OrderResource: the REST controller for Order related operations
    . ProductResource: the REST controller for Product related operations
    . LineItemDTO: a DTO that decouples client facing LineItems from server facing LineItems
    . OrderConfirmationDTO: a DTO that serves as a response when an Order has been successfully processed.
    . OrderDTO: a DTO that decouples client facing LineItems from server facing LineItems
    . ProductDTO: a DTO that decouples client facing LineItems from server facing LineItems
    . MapperHelper: a helper that transforms DTO into domain classes as needed.
    . application.yml: application is established on port 9001
    . create-schema.xml: creates the tables for MySQL and some stored procedures to facilitate the creation of Products.
    . insert-data.sql: inserts some products into the tables

The applications are installed into src/main/webapp and the complete application can be run using:
    mvn spring-boot:run
The Embedded Tomcat is configured to serve the store in:
    http://localhost:9001
and the Administration application in:
    http://localhost:9001/admin

The login functionality is pretty basic, as it is possible to access the admin application functionality without having performed login by accessing the address: http://localhost:9001/adminapp/admin.html#/main
(there is no view/method securization in place).

Authentication Details:
    . user: daniel, password: p@ssword

The CSRF has also been disabled:
    . Improvements:
        . Separate client and server apps.
        . Secure the methods
        . Implement CSRF
        . Clean the classes that belong to the other project
        . Investigate the proxy middleware

011-sports-store: The final version with a working backend that features Spring Security, login/logout functionality, etc.
The application still lacks some advanced features such as CSRF support, or a layer in Angular that simulates the methods available in JSP to control whether the user has authenticated or not, etc.