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
