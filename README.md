# ProAngularJS (2016)

> Examples and Concepts from ProAngularJS book, by Adam Freeman (Apress, 2014)

This repository contains my take on the examples and exercises found in the book. The `master` branch contains the original implementation I did on 2014, and the `angular2016` branch contains revisions of the same examples done on 2016.

Several things have changed since then, the library versions, the task runner version plugins and also the approach to some things such as the dependency management.

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

## Modules
Modules are the top-level components for AngularJS applications and have three main roles in AngularJS:
    . To associate an AngularJS application with a region of an HTML document
    . To act as a gateway to key AngularJS framework features
    . To help organize code and components in an AngularJS application

Modules are defined using:
    var app = angular.module('exampleApp', []);

When creating a module that will be associated with an HTML document the convention is to give the module the suffix APP such as in exampleAPP:
    <html ng-app="exampleApp">

The module() method is overloaded, and when used without parameters returns an instance of an existing module:
    var existingModule = angular.module('exampleApp');

Any AngularJS module can rely on components (services, filters, directives, etc.) defined in other modules, and this feature makes it very easy to organize the code in a complex application.

### Module Controllers
Controllers in AngularJS applications act as a conduit between the model and the views - they deliver data and behavior to the view.

    app.controller('MainController', function($scope) {
        ...
    });

You can apply a controller to a view using the ng-controller directive:
    <div class="panel" ng-controller="MainController as mainCtrl">
        I can use the mainCtrl data and behavior here
    </div>

A controller can support multiple views, which allows the same data to be presented in different ways. An application will contain multiple controllers.

### Module Directives
Directives let you extend and enhance HTML to create rich web applications.
    app.directive('cart', function() {
        return {
            restrict: 'E',
            templateUrl: '/components/cart/cart.html',
            controller: function() {
                ... controller data and behavior ...
            },
            controllerAs: 'cartCtrl'
        };
    });

and also:
    app.directive('highlight', [function() {
        return function(scope, element, attrs) {
            if (scope.dayName === attrs.highlight) {
                element.css('color', 'red');
            }
        };
    }]);

Note that directive accepts a factory function, so called because they're responsible for creating the object that AngularJS will employ for creating the object. Often factory functions return Worker functions (as in this case). Worker functions are the functions AngularJS will use to perform some work, in this case, each time AngularJS needs to apply the directive the return function of the factory function will be called.

### Module Filters
Filters are used in views to format the data displayed to the user. They are typically used to ensure consistency in data presentation across multiple controllers and views.

    app.filter('dayName', [function() {
        return function(inputParam) {
            ... return some filtered data ...
        };
    }]);

Filters are applied in template expressions contained in views:
{{tomorrow | dayName}}

and you can apply a filter's functionality programmatically using $filter

        var dayFilter = $filter('dayName');
            if (dayFilter(scope.dayName) === attrs.highlight) {
                element.css('color', 'red');
            }

### Module Services
Services are singleton objects that provide any functionality that you want to use throughout an application. Some key AngularJS functionalities are delivered as services ($scope, $filter, $http, ...)
The Module objects provide three methods to create services: service, factory and provider (the three are closely related).

    app.service('daysService', [function() {
        this.today = new Date().getDay();
        this.tomorrow = this.today + 1;
    }]);

The service method receives the name of the service and a factory method. When AngularJS calls this function it assigns a new object that is accessible via this keyword, so this.today and this.tomorrow will be accessible from within the code just by injecting daysService and using daysService.today and daysService.tomorrow:

    app.controller('TodayController', ['$scope', 'daysService', function($scope, daysService) {
        $scope.dayName = daysService.today;

    }]);

It is also important to note that you can create your components in any order and AngularJS will ensure that everything is set up correctly before it starts calling the factory functions and performing DI.

### Module Values
The Module.value method lets you create services that return fixed values and objects. Thanks to this option, you will be able to use DI with those.

    var now = new Date();
    app.value('nowValue', now);

    app.service('daysService', ['nowValue', function(nowValue) {
        this.today = nowValue;
        this.tomorrow = nowValue + 1;
    }]);

Note: the constant method is similar, but the one defined with constant can be used in the config phase.

### Module Life Cycle: config and run
The Module.config() and Module.run() lets you register functions that are invoked at key moments in the life cycle of an AngularJS app:
    . config-registered behavior is invoked when the current module has been loaded
    . run-registered behavior is invoked when all modules have been loaded

## Directives
Directives are the most powerful AngularJS feature; they allow you to extend HTML to create the foundation for rich an complex web apps in a way that is naturally expressive: You crete AngularJS web apps by embracing and enhancing HTML.

### Data Binding Directives
The data binding directives are responsible for performing data binding between the values from the model and the values that appear on the HTML document (view).

Typically, data binding directives can be applied as an attribute or class directives:
    There are <span ng-bind="todos.length"></span> items.
        vs.
    There are <span class="ng-bind: todos.length"></span> items.

Where possible, the first option is preferred, as it is more expressive.

#### One-Way Bindings
One-way binding means a value is taken from the data model and inserted into the HTML element. The binding is live, which means that when the value associated with the binding is changed, the HTML element will be updated to reflect the new value.

The `ng-bind` directive is used for creating one-way data binding, but it is rarely used as the syntax: {{data}} is preferred. This template replaces the content of the element that is applied to and can be used only for a single data item:
    There are <span ng-bind="todos.length"></span> item(s).

The ng-bind-template replaces the content of the element that is applied to with the specified template:
    <div ng-bind-template="First: {{todos[0].action}}; Second: {{todos[1].action}}">
    </div>

You can also prevent inline data-binding using ng-non-bindable directive:
        <div ng-non-bindable>
            There are {{todos.length}} item(s).  <-- AngularJS will not perform data binding here
        </div>

#### Two-way Data Bindings
Two way data bindings track changes in both directions, allowing elements that gather data from the user to modify the state of the application.
    <input class="form-control" ng-model="todos[0].action" placeholder="First Item"/>

Two-way data bindings can be applied only to elements that allow user to provide a dat value (input, textarea and select elements). Changes to data model properties are disseminated to all of the relevant bindings ensuring that the application is kept in sync.

### Template Directives
The template directives are a set of AngularJS directives that can be used to generate HTML elements using templates, making it easy to work with data collections and add basic logic to a template that responds to the state of the data.

### Generating Elements Repeatedly
The ng-repeat directive can be used to generate the same content for each item in a collection:
    <tr ng-repeat="todo in todos">
        <td>{{todo.action}}</td>
        <td>{{todo.complete}}</td>
    </tr>

The directive iterates through the objects in the array, creates a new instance of the element and its content, and the processes the templates it contains.

It is also possible to use ng-repeat to enumerate the properties of an object:
    <tr ng-repeat="todo in todos">   <-- Iterate over todos collection of items
        <td ng-repeat="prop in todo"> <-- Iterate over todo object properties
            {{prop}}
        </td>
    </tr>

You can also obtain the item extracted from the collection as a pair of {key, value} properties:
    <tr ng-repeat="(key, value) in todos">
        <td>{{key}}</td>                        <-- 0: {action: 'Get groceries', completed: false},
        <td>{{value}}</td>                          1: {action: 'Call plumber', completed: false}...
    </tr>


    <tr ng-repeat="todo in todos">
        <td ng-repeat="(key, value) in todo">
            {{key}}={{value}}                   <-- action=Get groceries, completed=false, ...
        </td>
    </tr>

When using ng-repeat, AngularJS also provides a set of built-in variables that provide context for the data being processed:
    . $index: the index of the processed item in the collection
    . $first: true if the current object is the first element of the collection
    . $middle: true if the current object is neither first nor last
    . $last: true if the current object is the last element of the collection
    . $even: true if the current object corresponds to an even position
    . $odd: true if the current object corresponds to an odd position

    <tr ng-repeat="todo in todos">
        <td>{{$index + 1}}</td>         <-- 0+1, 1+1, ..
        <td ng-repeat="prop in todo">
            {{prop}}
        </td>
    </tr>

AngularJS also provides the ng-repeat-start and ng-repeat-end directives useful to generate multiple table rows for each data item.
    <tbody>
        <tr ng-repeat-start="item in todos">
            <td>This is item {{$index}}</td>
        </tr>
        <tr>
            <td>The action is: {{item.action}}</td>
        </tr>
        <tr ng-repeat-end>
            <td>Item {{$index}} is {{item.complete? '' : 'not '}} complete</td>
        </tr>
    </tbody>

See how ng-repeat-start and ng-repeat-end begins a block in which the element extracted from the collection can be used. This lets you in the example above generate 3 rows for each item.

### Working with HTML fragments
The ng-include directive retrieves a fragment of HTML content from the server, compiles it to process any directives that it might contain and adds it to the DOM. These fragment are sometimes known as partial views (or partials).

    <div class="panel-body">
        <ng-include src="'components/table/table.html'"></ng-include>
    </div>

This directive has the following configuration parameters:
    . src: specifies the URL of the content to load. Note that src attribute is evaluated as a JavaScript expression and therefore, requires '' when using a static view.
    . onload: specifies an expression to be evaluated when the content is loaded
    . autoscroll: specifies whether AngularJS should scroll the viewport when the content is loaded

The ng-include directive can also be used as an attribute in other element:
    <div class="panel-body">
        <div ng-include="showView()" onload="reportChange()"></div>
    </div>


### Conditionally Swapping Elements
AngularJS provide the ng-switch directive when you need to switch between smaller chunks of content that are already within the document.

        <div ng-switch on="data.mode">
            <div ng-switch-when="Table">
                <table class="table">
                    <tr ng-repeat="todo in todos">
                        <td>{{$index + 1}}</td>
                        <td ng-repeat="todoProp in todo">
                            {{todoProp}}
                        </td>
                    </tr>
                </table>
            </div>
            <div ng-switch-when="List">
                <ol>
                    <li ng-repeat="todo in todos">
                        {{todo.action}}
                        <span ng-if="todo.complete">(done)</span>
                    </li>
                </ol>
            </div>
            <div ng-switch-default>
                Select another option to display a layout
            </div>
        </div>

### Hiding Unprocessed Inline Template Binding Expressions
There can be a moment when the browser displays the HTML in the document while AngularJS is still parsing the HTML so that the {{}} are visible.
The ng-cloak directive can be used to hide that content until AngularJS has finished parsing it.

You can apply that directive to the body, so that nothing is displayed to the user until the HTML is ready to be presented to the user, or you can be more selective and apply that directive only to the blocks in which {{}} are being used.

### Element Directives
Element Directives are used to configure and style elements in the DOM.

#### Showing, Hiding and Removing Elements
The ng-show and ng-hide directives control the visibility of elements by applying CSS that shows/hides that element from the user (note that the element will still be there.)

The ng-if directive removes a certain element from the DOM if the condition is not met.

#### Managing CSS classes
The ng-class and ng-style directives can be used to assign elements to classes and set individual CSS properties.

    <tr ng-repeat="todo in todos" ng-class="settings.Rows">
        <td>{{$index + 1}}</td>
        <td>{{todo.action}}</td>
        <td ng-style="{'background-color': settings.Columns}">
            {{todo.complete}}
        </td>
    </tr>

        <a ng-repeat="item in adminMainCtrl.screens" class="btn btn-block btn-default"
            ng-class="{'btn-primary': item === adminMainCtrl.currentScreen}"
            ng-click="adminMainCtrl.setScreen($index)">{{item}}</a>

The ng-style directive is configured using an object whose properties correspond to the CSS properties that should be set.

AngularJS also offers ng-class-even and ng-class-odd to apply the classes only to even or odd numbered elements.

#### Handling Events
HTML elements define events, which provide async notifications of user interactions. AngularJS defines a set of directives that specify custom behaviors when different types of events are triggered:
    . ng-blur       : an element loses its focus
    . ng-change     : an element content changes (inputs, checkboxes, etc.)
    . ng-click      : user clicks the mouse
    . ng-copy       : copy, cut, paste events
    . ng-cut        :
    . ng-paste      :
    . ng-dblclick   : user double-clicks on an element
    . ng-focus      : element gains focus
    . ng-keydown    : key related events
    . ng-keypress   :
    . ng-keyup      :
    . ng-mousedown  : mouse related events
    . ng-mouseenter :
    . ng-mouseleave :
    . ng-mousemove  :
    . ng-mouseover  :
    . ng-mouseup    :
    . ng-submit     : triggered when a form is submitted

    <button class="btn btn-info" ng-click="data.rowColor = button">{{button}}</button>

    <tr ng-repeat="todo in todos" ng-class="data.rowColor"
        ng-mouseenter="handleEvent($event)"
        ng-mouseleave="handleEvent($event)">
        <td>{{$index + 1}}</td>
        <td>{{todo.action}}</td>
        <td ng-class="data.columnColor">{{todo.complete}}</td>
    </tr>

All of the event directives define the special $event variable to access the Event object.

#### Boolean Attributes
AngularJS provides the following directives to manage boolean attributes found on HTML elements:
    . ng-checked  : to manage checked attribute on input elements
    . ng-disabled : to manage disabled attribute on input and button elements
    . ng-open     : to manage the open attribute of details elements
    . ng-readonly : to manage the readonly attribute of input elements
    . ng-selected : to manage the selected attribute of an option element

#### Other Attributes
There are three directives that AngularJS provides to work on attributes:
    . ng-href    : sets the href attribute on an <a> element
    . ng-src     : sets the src attribute of an img element
    . ng-srcset : sets the srcset on img selement.

    <div ng-repeat="image in images">
        <a href class="thumbnail"  ng-click="setSelectedImage($index)">
            <img ng-src="{{image}}" class="thumb">
        </a>
    </div>

Note that ng-src requires using {{}}.

## Forms

Using two-way data bindings allows you to implicitly create properties in the data model - a feature that is useful when you are using form elements to gather data from the user. Nevertheless, it sometimes have some drawbacks as those properties may be undefined if the user has not interacted with the elements in which those properties have been implicitly defined.

To solve this you can either explicitly define those properties in the model, or add some guards in the controller methods that read those properties only when those are defined (using angular.isDefined, for example).

### Form Validation
The first thing you must do to control a form validation is to include a <form> element with a name. After that, you must disable HTML5 browser validation so you have to use novalidate attribute in the form.
Then, you can use in the input elements required to control whether an element is required or not.
Additionally, AngularJS provides the following validation variables to control the status of the form:
    . $pristine : true if the user has not interacted with the element/form
    . $dirty    : true if the user has interacted with the element/form
    . $valid    : true if the contents of the element/form is valid
    . $invalid  : true if the contents of the element/form is invalid
    . $error    : provide details about the validation errors

## Controllers and Scopes
Controllers act as the link between the domain model and the view; they provide data and services to the view and define the behavior required to translate user action into changes into the model.

Your application must have at least one controller.

Controllers provide data and behavior to the view through scopes.

Each controller create its own scope, separate from other controller scopes. Scopes are organized in a hierarchy, in which $rootScope is the root of the tree.
The $rootScope is available as a service for DI.


### Communication between Controllers using Events
All scopes define a number of methods that are used to send and receive events:
    . $broadcast(evtName, argsObj) : sends an event from the current scope down to all child scopes. The argsObj is used to provide supplementary data with the event.

    . $emit(evtName, argsObj) : sends an event from the current scope up to the root scope.

    . $on(name, handler) : registers a handler function that is invoked when the event is received.

For example, to communicate to all child scopes that a value has been updated:
    $rootScope.$broadcast('zipCodeUpdated', {type: type, zipCode: zip});

To register a handler for that event in a child scope:
    $scope.$on('zipCodeUpdated', function(event, args) {
                    $scope[args.type] = args.zipCode;
                });

### Controller Inheritance
The ng-controller directive can be nested in the HTML document to create an effect known as controller inheritance. This is a feature that aims to reduce code duplication by letting you define common functionality in a parent controller and use it in one or more child controllers.

    . Behavior is inherited from parent to child controller
    . You can override and extend behavior in a child controller
    . Data modified in a child controller scope does not affect the parent scope.
    . Data modified in a child controller by behavior defined in the parent scope affects the parent scope.
    . Because of prototype inheritance, if instead of defining a property on the scope, you define an object, you will prevent local variables creation associated with each of the child scopes:
        $scope.dataValue = 'hello'; // This will create a local variable, and eventually will lead to desync
                                    // between parent and child scope data

        $scope.data = { dataValue : 'hello'}; // This will prevent desync, so that's the way to go.

### Scope-less Controllers

If scopes seem unnecessarily complex, and you don't need to communicate between controllers you can use scope-less controllers. These are controllers that provide data and behaviors to views directly as properties and methods of the controller.

### Integrating with another JavaScript framework
AngularJS provides three methods that let you register handler functions to respond to changes in the scope and inject changes in the scope from outside AngularJS.

    . $apply(expression) : applies a change to the scope
    . $watch(expression, handler) : Registers a handler that will be notified when the value referred to by the expression changes.
    . $watchCollection(object, handler) : registers a handler that will be notified when any of the properties of the specified object change.

## Filters
Filters transform the data before it is processed by a directive and displayed in a view without modifying the original data in the scope.
Filters can perform any kind of transformation, but typically they are used to present the same data in different ways, to sort the data and to filter out unwanted data.

AngularJS provides two types of built-in filters:
    . filters that operate on single values
    . filters that operate on collections

Filters can be chained together so that multiple filters operate in sequence on the same data.

### Filtering Single Data Values
    . currency  : format currency values
    . Date      : format date values according to the format specifiers:
                    . yyyy : four-year digit
                    . yy   : two-year digit
                    . MMMM : full month name (January)
                    . MMM  : short representation of month name (Jan)
                    . MM   : numeric month padded with zeros if needed (01, 02, .. 11, 12)
                    . M    : numeric month without padding (1, 2, ..., 11, 12)
                    . dd   : day of month padded with zeros
                    . d    : day of month without padding
                    . EEEE : day of the week full name (Monday)
                    . EEE  : day of the week short name (Mon)
                    . HH   : 24-hour with padding
                    . H    : 24-hour without padding
                    . hh   : 12-hour with padding
                    . h    : 12-hour without padding
                    . mm   : minutes with padding
                    . m    : minutes without padding
                    . ss   : seconds with padding
                    . s    : seconds without padding
                    . a    : marker for AM/PM
                    . Z    : four-char representation of the timezone

                    Additionally, you can (and should) use (for localization) shortcuts for formatting strings:
                    . medium      : equivalent to MMM d, y h:mm:ss a
                    . short       : equivalent to M/d/y h:mm a
                    . fullDate    : equivalent to EEEE, MMMM d, y
                    . longDate    : equivalent to MMMM d, y
                    . mediumDate  : equivalent to MMM d, y
                    . shortDate   : equivalent to M/d/yy
                    . mediumTime  : equivalent to h:mm:ss a
                    . shortTime   : equivalent to h:mm a

    . JSON      : generates an object from a JSON string
    . number    : formats a numeric value
    . uppercase : generates an all uppercase string
    . lowercase : generates an all lowercase string

### Localization: Localizing filter output
To localize filter output you must install the i18n component:
    `bower install angular-i18n --save`

and then reference the appropriate localization file in your index.html:
    <script type="text/javascript" src="bower_components/angular-i18n/angular-locale_es-es.js"></script>

Then automatically, filters will update its output to reflect the locale.

### Filtering Collections
    . limitTo : restricts the number of items taken from an array of data objects. This is useful for pagination.
                If you specify a positive value it will take the first items of the collection, if you specify a negative value, it will take the last items of the collection.
                limitTo:limitVal
                <tr ng-repeat="product in products | limitTo:limitVal">

    . filter  : used to select objects from an array.
                You can either use an object:
                    <tr ng-repeat="product in products | filter:{category: 'Fish'}">
                Or a function that must return true for the objects to be included:
                    <tr ng-repeat="product in products | filter:isFishOrBeer">

    . orderBy : sorts the objects in an array:
                You can either use a property:
                    <tr ng-repeat="product in products | orderBy:'price'">
                    <tr ng-repeat="product in products | orderBy:'-price'">
                or a sorting function that must return an object or value that will be used for comparison during sorting (lower values will come first):
                    <tr ng-repeat="product in products | orderBy:customSorter">
                You can also use multiple predicates:
                    <tr ng-repeat="product in products | orderBy:[customSorter, 'price']">


### Implementing Custom Filters for Single Data Values
Example:
    Implementation:
        angular.module('exampleApp.Filters', [])
            .filter('labelCase', function() {
                return function(value, reverse) {
                    if (angular.isString(value)) {
                        var temp = reverse ? value.toUpperCase() : value.toLowerCase();
                        return (reverse ? temp[0].toLowerCase() : temp[0].toUpperCase()) + temp.substr(1);
                    }
                };
            });

        Usage in the view:
            <td>{{product.category | labelCase:true}}</td>

### Implementing Custom Filters for Collections
Example:
    Implementation:
        angular.module('exampleApp.Filters', [])
            .filter('skip', function() {
                return function(data, count) {
                    if (angular.isArray(data) && angular.isNumber(count)) {
                        if (count > data.length || count < 1) {
                            return data;
                        } else {
                            return data.slice(count);
                        }
                    } else {
                        return data;
                    }
                };
            });

    Usage in the view:
        <tr ng-repeat="product in products | skip:2">

### Using Filters programmatically
By receiving the $filter service in your custom filter, you will be able to use built-in or custom filters programmatically from your custom filter:
        .filter('take', ['$filter', function($filter) {
            return function(data, skipCount, takeCount) {
                var skippedData = $filter('skip')(data, skipCount);
                return $filter('limitTo')(skippedData, takeCount);
            };
        }]);

## Custom Directives
You can create a custom directive whenever the built-in directives don't meet your needs, and you want to create self-contained functionality that you can reuse in different applications.

Directives are created using the Module.directive method that receives the number of the directive, and the factory function.
In the simplest of cases, the factory function returns a worker function known as the Link function, which links the directive with the HTML in the document and the data in the scope.

        .directive('unorderedList', [function() { <-- defines an `unordered-list` directive
            return function (scope, element, attrs) {       <-- the link function
                var data = scope[attrs['unorderedList']];
                if (angular.isArray(data)) {
                    var listElem = angular.element('<ul>');
                    element.append(listElem);
                    for (var i = 0; i < data.length; i++) {
                        listElem.append(angular.element('<li>').text(data[i].name));
                        console.log('Item: ' + data[i].name);
                    }
                }
            };
        }]);

The link function receives three parameters:
    . scope: the scope for the view in which the directive has been applied.
    . element: the HTML element that the directive has been applied to
    . attrs: the attributes of the HTML element

To access data from the scope you can use:

    var data = scope[attrs['unorderedList']];

    which is linked to the view:
        <div unordered-list="products"></div>

In order to modify the DOM of the view you use something like:
        var listElem = angular.element('<ul>');
        element.append(listElem);
        for (var i = 0; i < data.length; i++) {
            listElem.append(angular.element('<li>').text(data[i].name));
        }

which builds the following HTML fragment:
        <ul><li>Apples</li><li>Bananas</li><li>Pears</li></ul>

The idea is that you create an element using angular.element('<ul>') and you add elements using the append method. Finally, you add the created element to the DOM using element.append().
For example, to include a simple title for the list:
        var listTitle = angular.element('<h3>');
        listTitle.text('Unordered List of Products');
        element.append(listTitle);

You can also receive expressions such as:
    <div unordered-list="products" list-property="price | currency"></div>

But you need to eval the expression in your directive implementation:
    listElem.append(angular.element('<li>').text(scope.$eval(propertyExpression, data[i])));

Strictly speaking, when defining a directive you should return a definition object. This lets you fine tune how you can apply the directive:
        .directive('unorderedList', [function() {
            return {
                link: function(scope, element, attrs) {
                    ...
                },
                restrict: 'EACM' // allows the directiy to be applied as Element, Attribite, Class and Comment
            };

This definition object provides the following properties:
    . compile : specifies a compile function (when you modify the DOM)
    . controller: creates a controller for the directive
    . link: specifies the link function (perform tasks such as creating watchers and setting up event handlers)
    . replace: specifies whether the contents of the template should replace the element that the directive has been applied to.
    . require: declares a dependency on a controller.
    . restrict: species where the directive can be applied
        . E: element
        . A: attribute
        . C: class
        . M: comments
    . scope: creates a new scope on an isolated scope for the directive
    . template: specifies a template that will be inserted into the HTML document.
    . templateUrl: specifies an external template that will be inserted into the HTML document.
    . transclude: specifies whether the directive will be used to wrap arbitrary content.

### Managing Directive Scopes

By default, the link function is passed the scope of the controller that manages the view that contains the element to which the directive has been applied. In essence, this means that all instances of the directive will be bound to the same set of data, and sometimes this synchronization is not desirable (sometimes it is).
There are two possible solutions:
    . Add an additional controller for each directive instance you don't want to be synchronized. This may seem inelegant but sometimes is the only way (if you don't control the directive source, for example.)
    . Set the scope property to true, so that each directive instance is given a child scope in the scope hierarchy. In this case, the same rules of the scope hierarchy inheritance apply.

Sometimes, you will want the directive to have a completely separated scope, so that it does not inherit from any other scope. In the case that you'd want to interact with the controller scope, you're given the syntax:
        .directive('scopeDemo', [function() {
            return {
                template: '<div class="panel-body"><p> Data Value: {{local}}</p>',
                scope: {
                    local: '@nameprop'
                }
            };

### Transclusion
The term transclusion means to insert one part of a document into another by reference. This is useful when you are creating a directive that is a wrapper around arbitrary content.

### Compile Function
The directive definition object provides a compile property where you can implement any kind of DOM manipulation you require, so that the link function can focus on data related issues.

### Directive Controllers
Directives can creat controllers, which allows for the creation of more complex components.

** Chapters 16 and 17 have been read and most of the examples have been included, but they require a second read to fully understand the matter. **

## Services
Services are used to encapsulate functionality that you want to reuse in an application and don't fit into the MVC pattern:
    . They are not part of the controllers because they don't respond to user interaction or perform operations on the model.
    . They are not part of the view (or directive) because they don't present the model to the user.

Services are typically used to implement cross-cutting concerns such as logging, security, networking, etc.

The AngularJS module defines three methods for defining services: factory, service and provider. The result of using these methods is the same - a service object that can be used thorughout the AngularJS application. The differences strive on the way the service object is created and managed.

### Creating Services using the factory Method
The Module.factory method creates a service object.
When AngularJS needs to satisfy a dependency for this service it uses the object returned by the factory function.

    angular.module('exampleApp.Services', [])
        .factory('logService', function() {
            var messageCount = 0;
            return {
                log: function(msg) {
                    console.log('LOGSERVICE[' + messageCount++ + ']:' + msg);
                }
            };
        });


** NOTE **
In general practice, the factory and service method should be considered equivalent.



### Creating Services using the service Method
The Module.service method also creates a service object.
When AngularJS needs to satisfy a dependency for this service it uses the object returned by the factory function as a constructor and then uses `new` to create the service object.

    function BaseLogger() {
        this.messageCount = 0;
    }

    BaseLogger.prototype.log = function(msg) {
        console.log(this.msgType + ':' + (this.messageCount++) + ': ' + msg);
    };

    function DebugLogger() {
    }
    DebugLogger.prototype = new BaseLogger();
    DebugLogger.prototype.msgType = 'DEBUG';

    angular.module('exampleApp.Services', [])
        .service('logService', DebugLogger);

This can be used to leverage prototype inheritance in some cases.

### Creating Services using the provider Method
The Module.provider method creates a service object. It receives the name of the service and a factory function that must return a provider object, that defines a method called $get, which must in turn return the service object.
When AngularJS needs to satisfy a dependency for this service it will call the factory method to get the provider object and then will call the $get method to get the service object.

        .provider('logService', [function() {
            return {
                $get: function() {
                    return {
                        messageCount: 0,
                        log: function(msg) {
                            console.log('(LOG +' + (this.messageCount++) + ') ' + msg);
                        }
                    };
                }
            };
        }]);

The advantages of using the provider strives in that you can add functionality to the provider method that can be used to configure the returned object.

        .provider('logService', [function() {
            var counter = true;
            var debug = true;
            return {
                messageCounterEnabled: function(setting) {
                    if (angular.isDefined(setting)) {
                        counter = setting;
                        return this;
                    } else {
                        return counter;
                    }
                },
                debugEnabled: function(setting) {
                    if (angular.isDefined(setting)) {
                        debug = setting;
                        return this;
                    } else {
                        return debug;
                    }
                },
                $get: function() {
                    return {
                        messageCount: 0,
                        log: function(msg) {
                            if (debug) {
                                console.log('(LOG' +
                                    (counter ? ' +' + (this.messageCount++) : '') +
                                    ') ' + msg);
                            }
                        }
                    };
                }
            };
        }]);

### Services: DOM API Global Objects
AngularJS provides the following services that expose DOM API features:
    . $anchorScroll : scrolls the browser window to a specified anchor
    . $document : provides a jqLite object that contains the window.document object
    . $interval : provides an enhanced wrapper around window.setInterval function
    . $location : provides access to given the URL
    . $log : provides a wrapper around the console object
    . $timeout : provides an enhanced wrapper around window.setITimeout function
    . $window : provides a reference to the DOM window object


#### Intervals and Timeouts
The $interval and $timeout services lets you handle intervals and timeouts:
    . $timeout service delays and executes the function only once
    . $interval service delays and executes periodically


This services accepts the following arguments:
    . fn : function to be executed after the delay has expired
    . delay : the number of milliseconds before fn will be executed
    . count : the number of times that the delay/execute cycle will be repeated ($interval only). A    value of zero means no limit.
    . invokeApply: when set to true (default), fn will be executed within the scope.$apply method.

#### Location Service and accessing the URL
The $location service is a wrapper around the location property of the global window object and provides access to the current URL. The $location service operates on the part of the URL following the first # character, which means it can be used to navigate within the current document but not no navigate to new documents.

** NOTE **
In SPAs you rarely want the user to navigate away from the main document because it unloads your web application and discards your data and state.

For a URL like:
http://localhost:5000/#/cities/london?select=hotels#north

The $location service defines the following methods:
    . absUrl() : returns the complete of the current document including the parts before the first `#` character (http://localhost:5000/#/cities/london?select=hotels#north).
    . hash()/hash(target): gets or sets the hash section of the URL (north)
    . host : returns the hostname (localhost)
    . path()/path(target): get or sets the path component of the URL (/cities/#london)
    . port() : returns the port number (5000)
    . protocol() : returns the protocol component (http)
    . replace() : when called on an HTML5 browser the change in the URL replaces the most recent entry in the browser history rather than creating a new one
    . search()/search(term, params) : gets or sets the search term (select=hotels)
    . url()/url(target) : gets or sets the path, query string and hash (cities/london?select=hotels#north)

And the following events:
    . $locationChangeStart : triggered before the URL is changed. You can prevent the URL from changing by calling the preventDefault method on the Event object.
    . $locationChangeSuccess : triggered after the URL has changed.

Note that in a URL like http://localhost:5000/#/cities/london?select=hotels#north we are trying to replicate a URL after the first `hash` which is kind of messy.
HTML5 provides a more elegant approach using the History API, which lets you get rid of the `#` so that
the URL becomes: http://localhost:5000/cities/london?select=hotels#north
without having to reload the page.

This can be done by enabling the html5 mode for the locationProvider service:
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode(true);
        }]);

As it is a relatively new feature, it is advisable to check if that feature is available:
    if (window.history && history.pushState) {
        $locationProvider.html5Mode(true);
    }

#### The $anchorScroll function to scroll to the $location Hash
The $anchorScroll service scrolls the browser window to display the element whose id corresponds to the value returned by the $location.hash method.

This is extremely useful for long documents.

To use anchorScroll service you just have to declare the dependency, and $location.hash will automatically detect that dependency and perform the scrolling automatically.

        .controller('DefaultController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
            $scope.itemCount = 250;
            $scope.items = [];

            for (var i = 0; i < $scope.itemCount; i++) {
                $scope.items[i] = 'Item ' + i;
            }

            $scope.show = function(id) {
                $location.hash(id);
            };
        }]);

This default behavior can be disabled by configuring the anchorScrollProvider and calling:
$anchorScrollProvider.disableAutoScrolling(). If you do so, you will be responsible for calling $anchorScroll() whenever you want to jump.

### The $log service
AngularJS provide the $log service which is a wrapper around the console object. The $log service defines the debug, error, info, log and warn methods to display message with those levels.

### Exceptions
AngularJS uses the $exceptionHandler service to handle any exceptions that arise during the execution of an application and that are not caught using JavaScript's try-catch mechanism. The default implementation calls the error method defined by the $log service.

### XSS Security: Disabling Dangerous Data with $sce and $sanitize
AngularJS has some nice built-in support for mitigating the risk of injection attacks using the:
    . $sce : service that removes dangerous elements from HTML
    . $sanitize : replaces dangerous characters in HTML with their escaped counterparts

AngularJS has a good default policy for dealing with dangerous content, but you will have to work with $sce and $sanitize when you need more flexibility (for example, when creating an HTML editor).

If you want to disable some of the HTML escaping to allow HTML to be rendered you have to install the angular-sanitize module:
    bower install ng-sanitize --save

Then, you can use the directive ng-bind-html which will disable dangerous HTML but will allow some of the parts to be rendered:
    <span ng-bind-html="htmlData"></span>

You can rely on the default behavior of AngularJS to prevent most of the XSS attacks related to display of values. Nevertheless, it is recommended to sanitize the values that you store in your application, so that the data that you sent to the backend has been sanitized. This can be used by directly using the $sanitize service:

        $scope.$watch('htmlData', function(newValue) {
                $scope.htmlData = $sanitize(newValue);
            });

You can disable sce on a piece of HTML by using:
            $scope.$watch('htmlData', function(newValue) {
                $scope.trustedHtmlData = $sce.trustAsHtml(newValue);
            });

And binding the data using:
            <div class="panel-body">
                <span ng-bind-html="trustedHtmlData"></span>
            </div>

### Expressions and Directives Services
AngularJS provides some services that are used to process content into functions that you can then invoke to generate content in your applications, ranging from simple expressions to fragments of HTML that contain bindings and directives.

    . $compile : converts an HTML fragment that contains bindings and directives into a function that can be invoked to generate content.
    . $interpolate : converts a string that contain inline bindings into a function that can be invoked to generate content.
    . $parse : converts AngularJS expressions into functions that can be invoked to generate content.

These services are typically used on advanced directives when you get into problems that require precise management of templates.

Interpolate is configurable so that you can use a delimiter different from `{{}}` for the inline interpolation. Note that if you change the interpolation character, you will have to use it also in the HTML
        <div>
            Price: !!dataValue!!<br>
            Result: <span eval-expression amount="dataValue" tax="21"></span>
        </div>

## Services for AJAX and Promises

### Making Ajax requests using $http service
The $http service is used to make and process Ajax requests, which are standard HTTP requests that are performed asynchronously.

The following methods are provided by the $http service:
    . get(url, config)
    . post(url, data, config)
    . delete(url, config)
    . put(url, data, config)
    . head(url, config)
    . jsonp(url, config) : Performs a GET request to obtain a fragment of JavaScript code that is then executed. JSONP, which stands for JSON with Padding is a way of working around the limitation that browsers apply to where JavaScript code can be loaded from. As a consequence, it is extremely dangerous to use it.

As a rule of thumb:
    . GET should be used for all read-only information retrieval. GET requests are addressable, all the information is contained in the URL, so it's possible to bookmark and link to these addresses.
    . POST should be used for any operation that changes the application state.

In Ajax, the request is performed asynchronously, i.e. it is performed in the background and you have the chance of being notified when a response from the server is received.

AngularJS uses a JavaScript pattern known as a promise to represent the result from an async operation. A promise is an object that defines methods that you can use to register functions that will be invoked when the operation is complete.
The promise object returned by the $http service offers the following methods:
    . success(fn) : invokes the specified function when the HTTP request has sucessfully completed.
    . error(fn) : invokes the specified function when the request could not be successfully completed.
    . then(succesFn, errorFn) : registers the success and error functions

The handler functions you register will receive the following parameters:
    . data : the response body
    . status : the HTTP status code of the response
    . headers : the header getter function
    . config : the configuration object that was used to generate the request

AngularJS automatically processes JSON data so you can simply assign the value of the response body to scope data in order to use it. If you receive any other kind of content, you're responsible for the parsing of the document and the generation of the JavaScript associated object or collection of objects (see 094-).

The methods defined by the $http service all accept an optional argument of an object containing configuration settings, so that you can adjust way the requests are made when needed:
    . data : sets the data sent to the server. If you set this to an object, AngularJS will serialize it to the JSON format.
    . headers : set the request headers.
    . method : sets the HTTP method to be used in the request
    . params : used to set the URL parameters as an object whose property names and values correspond to the parameters you want to include.
    . timeout : the number of millis before the request expires.
    . transformRequest : used to manipulate the request before it is sent to the server
    . transformResponse : used to manipulate the response when it arrives from the server.
    . url : sets the url for the request
    . withCredentials : when set to true, the withCredentials option on the underlying browser request object is enabled, which includes authentication cookies in the request.
    . xsrfHeaderNamexsrfCookieName: to set the name of the cookie when server demands XSRF token.

It is also possible to define the default settings for Ajax requests using the $httpProvider:
    . defaults.headers.common : defines the default headers used for all requests
    . defaults.headers.post : defines the headers used for POST requests
    . defaults.headers.put : defines the headers used for PUT requests
    . defaults.transformResponse : An array of transform functions to be applied to all responses
    . defaults.transformRequest : An array of transform functions to be applied to all requests
    . interceptors : An array of interceptor factory functions
    . withCredentials : Sets the withCredentials option for all requests. This property is used to address cross-origin requests that require authentication.

#### Interceptors
The $httpProvider.interceptors is an array into which you insert factory functions that return object with properties:
    . request : the interceptor function will be called before the request is made and is passed the configuration object for the $http service.
    . requestError : the interceptor function will be called when the previous request interceptor throws an error.
    . response: the interceptor function is called when the response is received and is passed the response object.
    . responseError : the interceptor function is called when the previous response interceptor throws an error.

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push(function($log) {
                return {
                    request: function(config) {
                        config.url = 'productData.json';
                        return config;
                    },
                    response: function(response) {
                        $log.info('response length: ' + response.data.length);
                        return response;
                    }
                };
            });
        }]);

### Promises
Promises are a way of registering interest in something that will happen in the future, such as the response sent from a server for an Ajax request. Promises are not unique to AngularJS, but there are variations in the implementations to accommodate the differences in design philosophy.

There are two objects required for a promise: a promise object, which is used to receive notifications about the future outcome, and a deferred object, which is used to send notifications - the deferred object is used to send information about the outcome of the task or activity via the promise objects.

AngularJS provides the $q service for obtaining and managing promises, which it does through the following methods:
    . all(promises) : returns a promise that is resolved when all of the promises in the specified array are resolved or ony of them are rejected.
    . defer() : creates a deferred object.
    . reject(reason) : returns a promise that is always rejected
    . when(value) : wraps a value in a promise that is always resolved(with the specified value as result)

#### Getting and Using the Deferred Object
To create a deferred object to report on the eventual outcome of a task or activity you first need to obtain the object using `$q.defer()`.

A deferred object provides the following methods and properties:
    . resolve(result) : signals that the deferred activity has completed with the specified value.
    . reject(reason) : signals that the deferred activity has failed for the specified reason.
    . notify(result) : provides an interim result from the deferred activity.
    . promise : returns a promise object that receives the signals from the other methods.

Typically, you will expose the promise object to other parts of the application while keeping the deferred object out of reach of other components. For example, you can create a directive that creates the deferred object and expose the promise through the directive controller.

#### Consuming the Promise object
The Promise object defines the following methods:
    . then(success, error, notify) : registers functions that are invoked in response to the deferred object's resolve, reject and notify methods. The functions are passed the arguments that were used to call the deferred object's methods.
    . catch(error) : registers an error handling function, which is passed the argument used to call the deferred object's reject method.
    . finally(fn) : registers a function that is invoked irrespective of the promise being resolved or rejected. The function is passed the argument used to call the deferred object's resolve or reject method.

** NOTE **
Notice that the Promise object does not define the success() and error() methods used in the $http service. Those are convenience methods added to make working with $http service more transparent.

Promises represent a single instance on an activity, and once they are resolved or rejected cannot be be used again.

#### Chaining Outcomes Together
Promises have the ability to chain promises together to create a more complex arrangement of outcomes. This is possible because the methods defined by the promise object, such as then(), return another promise, which is resolved then the callback function has completed execution.

        ctrl.promise.then(function(result) {
            return 'Success (' + result + ')';
        }).then(function(result) {
            element.text(result);
        });

When you chain promises together, you can manipulate the result that is passed along to the next promise in the chain. In the example abobe, the text element will then be the result of the first handler function (`Success (result)`).

#### Grouping Promises
Besides chains on promises in which each handler function is executed in a sequence, it is possible to group promises. This is useful when you want to defer an activity until the other several outcomes are available.

You can do this using the $q.all() method which accepts an array of promises and return a promise that isn't resolved until all of the input promises are resolved.

See 100- for an example.

## Services for REST
Representational State Transfer (REST) is a style of API that operates over HTTP requests. The requested URL identifies the data to be operated on, and the HTTP method identifies the operation that is to be performed.

You should use AngularJS services for REST when you are performing operations on a RESTful API, as it is more advantageous than using $http service for making Ajax requests.

The $resource service is defined within an optional module called ngResource that can be installed via:
`bower install angular-resource --save`

As always, you will have to include that module in the index.html to make it available to your app, and also declare the dependency to ngResource in the main module of your application:
    <script type="text/javascript" src="bower_components/angular-resource/angular-resource.js"></script>

    angular.module('exampleApp', ['exampleApp.Controllers', 'ngResource'])


### Configuring the $resource service
** Note **
All the information of this section reference the example 104- (URLs, methods, etc.)

After setting up the dependency with ngResource, you have to set up the $resource service so that it knows how to work with the RESTful API exposed by the backend:

    $scope.productsResource = $resource(baseUrl + ':id', {id: '@id'});

The $resource service object is a function that is used to describe the URLs that are used to consume the RESTful service. The URL segments that change per object are prefixed with a colon `:`.
    . The first argument to the $resource function is http:\\localhost:9000\server\rest\products\:id
    . The second argument is a configuration object whose properties specify where the value for the variable segment will come from. Each property must correspond to a variable segment from the first argument.

The result of calling $resource() is an access object that can be used to query and modify the server data using the following methods:

| Name                    | HTTP   | URL                        | Description
| ----------------------- | ------ | -------------------------- | ----------------------------------------
| delete(params, product) | DELETE | /server/rest/products/{id} | Removes the object with the given id
| get(id)                 | GET    | /server/rest/products/{id} | Gets the object with the given id
| query()                 | GET    | /server/rest/products/     | Gets all the objects as an array
| remove(params, product) | DELETE | /server/rest/products/{id} | Removes the object with the given id
| save(product)           | POST   | /server/rest/products/{id} | Saves modifications to the object with the given id

The delete and remove methods are identical.

### Listing the REST data
Once you have the access object, you can assign it to a variable that can be used to obtain all the data from the server:
    $scope.productsResource = $resource(baseUrl + ':id', {id: '@id'});
    $scope.products = $scope.productsResource.query();

The array returned by the query method is initially empty, and is populated only when the underlying async HTTP request to the server is completed.

If you have to perform some kind of action when the request data is available, you can use a promise object that is included as part of the query() response:
    $scope.productsResource = $resource(baseUrl + ':id', {id: '@id'});
    $scope.products = $scope.productsResource.query();
    $scope.products.$promise.then(fnSuccess, fnError);

That promise is fulfilled after the result array is populated.

### Modifying REST Data
The query() method populates the collection array with Resource objects, which define all of the properties specified in the data returned by the server and some methods that allow manipulation of the data without having to use the collections array (which simplifies tremendously CRUD related code!)

The methods provided by the Resource objects are:
    . $delete : deletes the object from the server, equivalent to $remove()
    . $get    : refreshes the object from the server, clearing any uncommitted local changes
    . $remove : deletes the object from the server, equivalent to $delete()
    . $save   : saves the object to the server

All of the resource object methods return a promise that you can use to receive notifications when the request completes or fails.

The $save method for updating a Resource object that represents a product is used as:
    product.$save();

The $get method for retrieving a Resource object that represents a products is used ad:
    $scope.currentProduct.$get();

The $delete and $remove method send the request to remove an object from the server, but don't remove the object from the collection array. This is the safest approach as you don't know what the outcome of the request will be, and therefore, you have to use the promise returned by the $delete method to perform the removal from the local array of resources that represent the products:
                product.$delete().then(function() {
                    $scope.products.splice($scope.products.indexOf(product), 1);
                });

The $save method for creating a new product requires creating first a new resource that will represent that product. This is done using:
                new $scope.productsResource(product).$save().then(function(newProduct) {
                    $scope.products.push(newProduct);
                    $scope.displayMode = 'list';
                });
Thus, you apply the new keyword on the access object, and then call $save(). Again, the $save method doesn't update the collection array when new objects are saved to the server (but they do when they update an existing object!!!) so you have to use the promise returned by $save to perform the actions that you want to take when the request is completed.

### Configuring the $resource Service Actions
The get, save, remove and delete methods available on the collections array and the equivalent $get, $save, etc. are known as actions.
By default, $resource service defines the actions according to the table above (query - GET, save - POST, etc.) but you can easily configure the mapping using a third parameter in the $resource() call:
    $scope.productsResource = $resource(baseUrl + ':id', {id: '@id'},
        {
            create: {method: 'POST'},
            save: {method: 'PUT'}
        });

When using this, you will be defining new actions, whose names correspond to the action that is being defined, or redefined (as in the save case).

Each action property is set to a configuration object that allows the following parameters:
    . method : sets the HTTP method that will be used for the Ajax requests.
    . params : specifies the values for the segment variables in the URL passed as the first argument to the $resource service function.
    . url    : overrides the default URL for this action.
    . isArray: when true, specifies that the response will be a JSON data array. The default value, specifies that the response will be at most one object.
    . transformRequest
    . transformResponse
    . cache
    . timeout
    . withCredentials
    . responseType
    . interceptor

Actions that are defined in this way are just like the defaults and can be called on the collection array an on individual Resource objects:
                new $scope.productsResource(product).$create().then(function(newProduct) {
                    $scope.products.push(newProduct);
                    $scope.displayMode = 'list';
                });

### Leveraging $resource-ready Components
Using the $resource service lets you write components that can operate on RESTful data without needing to know the details of the underlying Ajax requests that are required to manipulate the data. You can see an example of how to do that in the directive from 104-.

## Services for Views
This section deals with URL routing, which uses views to enable sophisticated navigation within an application.
This services are intended for simplifying complex applications by allowing multiple components to control the content that user sees. For small projects, it is recommended to use ng-include as an alternative.

** NOTE **
The ng-include approach almost always involves setting the value of a variable defined in a particular controller:
    $scope.displayMode = 'list';

which must be accessed from anywhere in the application whenever we want to update the view:
    . in the controller: $scope.displayMode = 'list';

    <ng-include src="'tableView.html'" ng-show="displayMode === 'list'"></ng-include>

This approach does not scale well in large and complex applications.

First thing you need to do to use URL Routing is install the ngRoute module:
    `bower install angular-rout --save`

As always, you will have to update the index.html and the app module dependencies:
    <script type="text/javascript" src="bower_components/angular-route/angular-route.js"></script>
    angular.module('exampleApp', ['exampleApp.Controllers', 'ngRoute']);

### Defining URL Routes
The ngRoute service lets you perform the mapping between URLs and view file names. When the value returned by the $location.path method matches one of the mappings defined, the corresponding view file will be loaded and displayed. The mappings are defined using the provider for the $route service:
    angular.module('exampleApp', ['exampleApp.Controllers', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider.when('/list', {
                templateUrl: '/tableView.html'
            });

            $routeProvider.when('/edit', {
                templateUrl: '/editorView.html'
            });

            $routeProvider.when('/create', {
               templateUrl: '/editorView.html'
            });

            $routeProvider.otherwise({
                templateUrl: '/tableView.html'
            });

** NOTE **
Always specify the value of templateUrl with a leading `/` so that it is evaluated as an absolute URL. Otherwise, it will be evaluated relative to the value returned by the $location.path() and you can easily end up with a 404 - Not Found.

### Displaying the Selected View
The ngRoute module includes a directive called ng-view that displays the contents of the view file specified by the route that matches the current URL path returned by the $location service.
    ...
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h1 class="panel-title">Products</h1>
        </div>
        <ng-view></ng-view>
    ...

** NOTE **
Routing works when the application changes the URL, but it doesn't work if the user changes it manually. In that case, the browser tries to request the content corresponding to that URL from the server.


### Using Route Parameters
Route URLs can contain route parameters, which match one or more segments in the path displayed by the browser (a segment is a set of characters between two `/`).
    For example:
        http://localhost:5000/users/adam/details
    has the segments:
        users, adam and details.

You can have conservative and eager parameters:

    . conservative: The second segment and only the second segment will be assigned to id
            $routeProvider.when('/edit/:id', {
                templateUrl: '/editorView.html'
            });

    . eager: the second segment and only the second segment will be assigned to id, and the following parameters will be assigned to data.
            $routeProvider.when('/edit/:id/:data*', {
                templateUrl: '/editorView.html'
            });

### Accessing Routes and Routes Parameters
The URLs configured for the mapping between physical and logical views can be accessed in code using the $route and $routeParams services.

            $scope.$on('$routeChangeSuccess', function() {
                if ($location.path().indexOf('/edit/') === 0) {
                    var id = $routeParams['id'];
            ...

                }
            });

The $route service can be used to manage the currently selected route. It provides the following properties and methods:
    . current: returns an object with info about the active route. This object defines a controller property that returns a controller associated with the route and a locals property that provides the set of controller dependencies. The collection returned by locals also contains $scope and $template properties that return the scope for the controller and the view content.

    . reload(): reloads the view event when the URL path hasn't changed.

    . routes: returns the collections of the routes defined through the $routeProvider.

Additionally, the $route service defines the following events:
    . $routeChangeStart : triggered before the route is changed
    . $routeChangeSuccess : triggered after the route has changed
    . $routeUpdate : triggered when the route is refreshed; this is tied with the reloadOnSearch configuration property.
    . $routeChangeError : triggered if the route cannot be changed.

Note that the new path after the route has changed is obtained using: $location.path().

### Configuring Routes
The following table lists the Route configuration options:
    . controller : specifies the name of a controller to be associated with the view displayed by the route.
    . controllerAs : specifies an alias to be used for the controller
    . template : specifies the contentn of the view, either as a literal HTML string or as a function that returns the HTML associated with the tamplate.
    . templateUrl : specifies the URL of the view file to display when the route matches. This can be specified as a string or as a function that returns a string.
    . resolve : specifies a set of dependencies for the controller.
    . redirectTo : specifies a path that the browser should be redirected when the route is matched. This can be expressed as a string or a function.
    . reloadOnSearch : when true, the default value, the route will reload only when the values returned by the $location.search() and hash() methods change.
    . caseInsensitiveMatch: when true, the default value, routes are matched without honoring the case.

### Using Controllers with Routes
If you have lots of views in an application, having them share a single controller becomes difficult to manage and test. The controller configuration option allows you to specify a controller that has been previously registered through the Module.controller method for the view.
By using this option you will be separating the behavior that is unique to each view.

When using this technique, the view controller will be nested within the top-controller, so that you will be able to define the common behavior on the parent controller and only the behavior specific to the view will be specified in this view controller.

### Adding Dependencies to Routes
The resolve configuration property allows you to specify dependencies that will be injected into the controller specified with the controller property.
Typically, you will use this property to perform work required to initialize the view. This is so because you can return promise objects as dependencies and the route won't instantiate the controller until they are resolved.

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives', 'ngResource', 'ngRoute'])
        .constant('baseUrl', 'http://localhost:9000/server/rest/products/')
        .factory('productsResource', ['$resource', 'baseUrl', function($resource, baseUrl) {
            return  $resource(baseUrl + ':id', {id: '@id'},
                {   create: {method: 'POST'},
                    save: {method: 'PUT'}
                });
        }])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

...
            $routeProvider.otherwise({
                templateUrl: '/tableView.html',
                controller: 'TableController',
                resolve: {
                    data: ['productsResource', function(productsResource) {
                        return productsResource.query();
                    }]
                }
            });
        }]);

## Services for Animation
The $anime service allows you to provide transition effects when elements are added, removed or moved in the DOM. This service relies on CSS3 animation and transition features.

Animations should be subtle, brief and quick. The goal's to draw the user's attention to the fact that something has changed. Animations should be used consistently, cautiously and sparingly.

To install the animation module you should type:
    `bower install angular-animate --save`

Then, you will have to establish the dependency with the ngAnimate module and include the angular-animate.js file:

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives',
                                    'ngResource', 'ngRoute', 'ngAnimate'])

    <script type="text/javascript" src="bower_components/angular-animate/angular-animate.js"></script>

In the example, we define the style and apply it as a class in the directive:
    <style type="text/css">
        .ngFade.ng-enter {
            transition: .5s linear all;
            opacity: 0;
        }
        .ngFade.ng-enter-active {
            opacity: 1;
        }
    </style>

    <div ng-view class="ngFade"></div>

This produces a fade effect each time the view is changed.

The key to understand what's happening is the knowledge that some of the built-in directives support animations when they change their content:

    . ng-repeat  : enter, leave, move
    . ng-view    : enter, leave
    . ng-include : enter, leave
    . ng-switch  : enter, leave
    . ng-if      : enter, leave
    . ng-class   : add, remove
    . ng-show    : add, remove
    . ng-hide    : add, remove

The name `enter` is used when the content is shown to the user.
The name `leave` is used when the content is hidden from the user.
the name `move` is used when the content is moved within the DOM.
The names `add` and `remove` are used when the content is added and removed from the DOM.

In the example:
    .ngFade.ng-enter : the first part of the name ngFade is the named used to apply the animations or transitions such as in class="ngFade". The second part tells AngularJS what the CSS style is to be used for: ng-enter and ng-enter-active. The first one defines the start point and details of the transition. The second one defines the end-point for the transition.

## Services for Touch Events
The ngTouch module contains the $swipe service which is used to improve support for touchscreen devices. The events in ngTouch module provide notification of swipe gestures and a replacement for the ng-click directive.

You can install the ngTouch module using:
    `bower install angular-touch --save`

    angular.module('exampleApp', ['exampleApp.Controllers', 'ngTouch']);

    <script type="text/javascript" src="bower_components/angular-touch/angular-touch.js"></script>

Once installed, you will be provided with events such as ng-click (improved for touch, ng-swipe-*, etc.)
    <div class="well well-sm"
        ng-swipe-right="handleSwipe('left-to-right')"
        ng-swipe-left="handleSwipe('right-to-left')">
        <h4>Swipe Here</h4>
    </div>

## Services for Provision and Injection
This section describe the services that AngularJS uses behind the scenes for registering AngularJS components and injecting them to resolve dependencies.
The contents of this section are particularly interesting for the unit testing.

### Registering AngularJS components
The $provide service is used to register components such as services so that they can be injected in order to satisfy the required dependencies. Most of the functionality defined by the $provide service is exposed and accessed through the Module type, but not all (the decorator).

The following table lists the methods defined by the $provide service:
    . constant(name, value)    : defines a constant value
    . decorator(name, service) : defines a service decorator
    . factory(name, service)   : defines a service
    . provider(name, service)  : defines a service
    . service(name, service)   : defines a service
    . value(name, value)       : defines a value service

The decorator method is used to intercept requests for a service in order to provide different or additional functionality.

For example, to decorate the $log service:
    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$provide', function($provide) {
            $provide.decorator('$log', function($delegate) {
                $delegate.originalLog = $delegate.log;
                $delegate.log = function(message) {
                    $delegate.originalLog('Decorated: ' + message);
                };
                return $delegate;
            });
        }]);

The arguments to the decorator method are the name of the service to decorate ($log) and a decorator function that must declare a dependency on $delegate, which is used to pass the original service to your function.

Your decorator function must return the object you want used to resolve dependencies for the service you specified.

You can change a service in any way that you want, but you must remember that the object you return from your decorator function will be passed to components that already have an expectation about the nature of the service object.

### Managing Injection
The $injector service is responsible for determining the dependencies that a function declares and resolving those dependencies.

The methods defined for the $injector service are:
    . annotate(fn) : gets the arguments for the specified function, including those that do not correspond to services.
    . get(name) : gets the service object for the specified service name
    . has(name) : returns true if a service exists for the specified name
    . invoke(fn, self, locals) : invokes the specified function, using the specified value for this and the specified nonservice argument values.

There is rarely a need to work directly with this service.

# Unit Testing

Unit Testing is the technique of isolating a single small piece of functionality and testing it independently of the rest of the application and AngularJS.
When carefully applie, unit testing can reduce the number of software defects that show up later in the development process, especially those that appear when the application is deployed.

Unit testing works best with teams that have strong design skills and a good understanding of what and who the finished product is for, as this will prevent using as a measure of quality passing arbitrary unit tests that in no case reflect the inputs that actual users will perform.

## Working with Karma and Jasmine

When writing tests, you should use the pattern called arrange/act/assert:
    . Arrange: set up the scenario required for the test
    . Act : perform the test
    . Assert : verify that the actual result matches the expected results

The most common Jasmine functions are:
    . describe   : Groups a number of related tests
    . beforeEach : Executes a function before each test, for the arrange part.
    . it         : Executes a function to form a test, for the act part
    . expect     : Identifies the result from the test, for the assertion

There are a lot of to*() functions for evaluating test results:
    . expect(x).toEqual(val)       : compares the result from the test to the expected value
    . expect(x).toBe(obj)          : asserts that x and obj are the same object
    . expect(x).toMatch(regex)     : asserts that x matches the specified regular expression
    . expect(x).toBeDefined()      : asserts that x has been defined
    . expect(x).toBeUndefined()    : asserts that x has not been defined
    . expect(x).toBeNull()         : asserts that x is null
    . expect(x).toBeTruthy()       : asserts that x is true or evaluates to true
    . expect(x).toBeFalsy()        : asserts that x is false or evaluates to false
    . expect(x).toContain(y)       : asserts that x is a string that contains y
    . expect(x).toBeGreaterThan(y) : asserts that x is greater than y

## Understanding the Mock Objects
Mocking is the process of creating objects that replace the key components in an application to allow effective unit testing.
The components that the target for testing depends on are replaced by mock objects, which implement the API of the components that are required but generate fabricated, predictable results. You can alter the behavior of the mock objects to create different scenarios in which to test your code, which makes it easy to arrange a wide range of tests without having to endlessly reconfigure test servers, database, networks, etc.

### The ngMocks Module

The ngMocks module contains a set of mock objects that are used to replace AngularJS components.

The following Mock objects are contained in the ngMocks module:
    . angular.mock : used to create mock modules and resolve dependencies
    . $exceptionHandler : a mock implementation of the $exceptionHandler service that rethrows the exceptions it receives.
    . $interval : a mock implementation of the $interval service that allows time to be moved forward to trigger scheduled functions on demand.
    . $log : a mock implementation of the $log service that exposes the messages it receives through a set of properties, one for each of the methods defined by the real service.
    . $timeout: a mock implementation of the $timeout service that allows the timer to be expired programmatically, so that the associated function can be executed on demand.

The angular.mock object provides methods that load modules and allow dependencies to be resolved in unit tests. It provides the following methods:
    . module(name) : loads the specified module
    . inject(fn)   : resolves dependencies and injects them into a function.
    . dump(object) : serializes an AngularJS object

In addition to the ngMocks module, AngularJS provides also some other methods that are useful for unit testing:
    . $rootScope.$new() : creates a new scope
    . $controller(name) : creates an instance of the specified controller
    . $filter(name)     : creates an instance of the specified filter

## Testing a Controller
To test a controller, you first of all load the module that contains the controller:

    beforeEach(angular.mock.module('exampleApp.Controllers'));
        or
    beforeEach(module('exampleApp.Controllers'));

as module() is defined globally.

Then, you have to instantiate the controller and provide its dependencies:

        beforeEach(angular.mock.inject(['$controller', '$rootScope', function($controller, $rootScope) {
            mockScope = $rootScope.$new();
            controller = $controller('DefaultController', {
                $scope: mockScope
            });
        }]));

After that, you can perform the actual unit tests:

        it('creates variable', function() {
            expect(mockScope.counter).toEqual(0);
        });

        it('increments counter', function() {
            mockScope.incrementCounter();
            expect(mockScope.counter).toEqual(1);
        });

## Mock Objects

### Mocking HTTP Responses
The $httpBackend service provides a low-level API that is used by $http service to make Ajax requests. The equivalent $httpBackend service included in ngMocks module makes it easy to consistently simulare responses from a server, which allows a unit of code to be isolated from real servers and networks.

The methods defined by $httpBackend are:
    . expect(method, url, data, headers) : defines an expectation for a request that matches the method and URL with optional data and header matches.
    . flush() : sends back pending results.
    . flush(count) : sends back the specified number of responses.
    . resetExpectations() : resets the set of expectations
    . verifyNoOutstandingExpectation() : checks that all of the expected requests have been received.
    . respond(data) : defines a response for an expected request
    . response(status, data, headers) : same as above


** Note **
To reflect the async nature of Ajax requests, the $httpBackend service won't send its canned responses until the flush() method is called. This allows you to test the effect of long delays or timeouts if necessary.

Calling the flush() method resolves the promise returned by the $http service and executes the success function defined by the controller:

### Mocking Periods of Time
The $interval and $timeout mock services allow you to explicitly trigger the callback functions registered by the code being tested.

|Service    |Method                  |Description                                                 |
|-----------|------------------------|----------------------------------------------------------- |
| $timeout  | flush(millis)          | Advances the timer by the specified number of milliseconds |
| $timeout  | verifyNoPendingTasks() | Checks whether there are callbacks yet to be invoked       |
| $interval | flush(millis)          | Advances the timer by the specified number of milliseconds |
---------------------------------------------------------------------------------------------------

### Mocking Logging
The mock $log service keeps track of the log messages it receives and presents them through a logs property that is added to the real service method names: log.logs, debug.logs, warn.logs, etc.
Using this properties let you check that a unit code is logging messages correctly.

Additionally, the mock $log service provides the methods:
    . assertEmpty() : throws an exception if any logging messages have been written
    . reset() : clears the stored messages

## Testing Filters
You can obtain programmatically instances of a filter through the $filter service. This can be effectively used to unit test filters.

## Testing Directives
Testing directive is more complicated than testing controllers and filters because of the way that directives are applied to HTML and also because directives modify HTML.
For this reason, unit testing for directives involve jqLite and the $compile service.

See the example 121-. Note that in this example we cannot apply the directive to the result of the $http.get because $http.get returns a promise and not the actual data. because of that, when the directive is executed, $scope.products is always undefined. Thus, in the example an static array is defined.

## Testing a Service
Testing services is easy, as by definition are stand-alone components.

# End-to-End Testing


## Examples

### Part 0 - Project Templates

#### 000-simple-dev-debug
The simplest project template (development only) for an AngularJS application.

### Part 1 - Getting Ready

#### Section 01 - Hello Angular

##### 000-todo-app-v0
A static mock-up of the ToDo AngularJS application.


##### 000-todo-app-v1
The ToDoApp version 1 that covers in a very lightweight way the following topics:
    . modules
    . controllers
    . filters: custom and built-in
    . two-way databinding
    . directives: ng-hide, ng-class, ng-submit, ng-repeat
    . form validation

##### 002-todo-app-http-service
Based on [000-todo-app-v1](000-todo-app-v1), this instance of the application retrieves the list of items from a JSON file using the `$http` service.

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

012-hello-angularjs: a simple AngularJS application that is used to illustrate the concepts presented on chapter 9 up to the "Using Modules to Organize Code" section.

013-hello-angularjs-refactoring: a simple AngularJS application that is used to illustrate the concepts presented on chapter 9 from "Using Modules to Organize Code" section the end. It also illustrates some basic concepts about the module lifecycle, by displaying in the console some messages that can be used to see how a constant value can be injected in the different phases of the module lifecycle.

014-directives: Illustrates one-way and two-way data binding directives in a simple example that follows the book test from the beginning of AngularJS example app for chapter 10 - Using Bindings and Template directives up to the Using the Template Directives.

015-repeat-template-directives: Illustrates the different scenarios for ng-repeat directive, which corresponds from Using the Template Directives section to Working with Partial Views (excluded).

016-html-fragments: Illustrates the ng-include directive for working with HTML fragments. This corresponds to the section from Working with Partial Views on Chapter 10.

017-todo-dynamic-views: The static To Do list application featuring a checkbox that lets you select whether you want to see the items as a table or as an ordered list. It illustrates how to use ng-include attribute to select partial views dynamically.
Besides, the information in the Done column should read (Done) when it is completed.

018-todo-dynamic-views-as-attrib: The same example as 017- but using ng-include as an attribute inside a div.

019-swapping-html-elems: Illustrates how to use ng-switch to conditionally display small chunks of html.

020-hiding-unprocessed-moustaches: Illustrates how to prevent {{}} from showing while AngularJS is parsing the document using the ng-cloak directive.

021-showing-hiding-removing-elemts: Illustrates the ng-show, ng-hide and ng-if directives as explained on Chapter 11 section Showing, Hiding and Removing Elements.

022-table-striping: Demonstrates how using ng-repeat and ng-hide create inconsisting table striping (even when using Bootstrap) because elements are not removed from the DOM, but only hidden using CSS. The example also illustrates two techniques to solve it: using ng-if to effectively remove the elements from the DOM and also apply a filter to remove the elements that you don't want to be displayed.

023-classes-and-styles: illustrates how to use ng-class and ng-style.

024-events: illustrates how to use several built-in event directives such as ng-click, ng-mouseenter, etc.

025-custom-event-directive: illustrates how to create a custom directive to handle touch events.

026-managing-boolean-attributes: illustrates how to manage boolean attributes with an example that uses ng-disabled to disable a button using a value from the model.

027-managing-other-attributes: illustrates how to manage other attributes with an example that uses ng-src to set the src attribute of an img element.

028-forms-implicit-model-creation: illustrates how you can implicitly create model properties using ng-model directive.

029-basic-form-validation: illustrates how you can perform basic form validation including:
    . disabling submission when required input elements not populated
    . providing validation feedback using CSS
    . providing validation feedback using elements (error tooltips)
    . discerning between format and required for validation errors

030-deferring-form-validation: Illustrate how to defer the validation feedback until the submit button is clicked. AngularJS does not provide built-in support for this but you can achieve it defining some behavior in the controller.

031-form-input-elem-directives: Illustrate AngularJS directives that can be applied to input elements.

032-form-checkbox-elem-directives: Illustrate AngularJS directives that can be applied to checkboxes.
Note that when you use the required attribute, the example fails.

033-form-textarea-elem-directives: Illustrate AngularJS directives that can be applied to textboxes.

034-form-select-elem-directives: Illustrate AngularJS directives that can be applied to select elements.

035-controllers-basics: Illustrates how to add basic behavior to an app using controllers.

036-monolithic-controller: Illustrates how to create a monolithic controller that is applied to the body element of the view and controls all the functionality of the application.

037-reusing-controller: Illustrates how to reuse the same controller for two different parts of view, and as a consequence, you have two separate scopes. In this application, the `Use Billing` button does not work because the second scope does not see the first one.

038-communicating-controllers: Illustrates how to use events to communicate two controllers. The `$rootScope.$broadcast` method is used to notify that a certain piece of data has changed. Then, a controller can use the `$scope.$on` to subscribe to that particular event and read the event information.

039-using-services-to-mediate-scope-events: The same example as 038- but using a service to mediate the scope events. By using this method, the controller does not have to receive the $rootScope, and only registers the event handler and uses the service to communicate that a piece of info has changed.

040-controller-inheritance: Illustrate the intrincacies of controller inheritance by creating an example with a top level controller that provides two functions:
    . reverse()
    . case()

Then two child controllers are created, both of them inherit the reverse() method, and the first one overrides the case() method and the second one overrides the case() method and provides a new one called shift().

Top Level Controller's:
    . If you type in the text field all three data values are changed
    . Reverse: all three data values are changed using top level controller behavior
    . Case: all three data values are changed using top level controller behavior

Child Controller #1's:
    . If you type in the text field only this value is changed. If you then click on revers, top level and child controller dataValues are changed, but not the dataValue for child controller #1.
    . Reverse: all three data values are changed using top level controller behavior
    . Case: Only the child controller data is modified

When you click on Child Controller #2's:
    . If you type in the text field only this value is changed. If you then click on revers, top level and child controller dataValues are changed, but not the dataValue for child controller #1.
    . Reverse: all three data values are changed using top level controller behavior
    . Case: Only the child controller data is modified
    . Shift: Only the child controller data is modified

As a summary:
    . Behavior is inherited from parent to child controller
    . You can override and extend behavior in a child controller
    . Data modified in a child controller scope does not affect the parent scope.
    . Data modified in a child controller by behavior defined in the parent scope affects the parent scope.

041-controller-inheritance-solved: This example illustrates how to fix the odd behavior of 040- where you have a parent controller with two child controllers that extend from it.
The odd behavior consists in that if you type in a child textfield, and then click on the Reverse button the dataValues for the top level and other child controller are changed, but not the one that you have changed.

Top Level Controller's:
    . If you type in the text field all three data values are changed
    . Reverse: all three data values are changed using top level controller behavior
    . Case: all three data values are changed using top level controller behavior

Child Controller #1's:
    . If you type in the text field all three data values are changed
    . Reverse: all three data values are changed using top level controller behavior
    . Case: all three data values are changed using child controller #1 behavior

When you click on Child Controller #2's:
    . If you type in the text field all three data values are changed
    . Reverse: all three data values are changed using top level controller behavior
    . Case: all three data values are changed using child controller #2 behavior
    . Shift: all three data values are changed using child controller #2 behavior

042-leveraging-multiple-controllers: Illustrates how to use scopeless controllers.

043-filter-single-data-values: Illustrates how to use the built-in filters for single data values including currency, date, casing and JSON.

044-localization-filter-ouput: Illustrates how to apply automatic localization of single data value filters by including a localization file from angular-i18n into your project.

045-filtering-collections: Illustrates how to use the built-in filters for collections including limitTo, filter and orderBy. It is also demonstrated filter chaining.

046-custom-filters: Illustrates how to create a custom filter for single data values, collections and also how to programmatically leverage existing filters.

047-custom-directives: Illustrates how to create a custom directive unordered-list that appends a <ul> with the products in the scope.

048-custom-directives-params: Illustrates how to pass additional parameters to the directive to control additional aspects, such as breaking the data dependency.

049-custom-directives-eval: Illustrates how to evaluate parameter values as expressions so that filters can be used in our directive.

050-handling-data-changes: Demonstrates how to create a watcher function to update the directive contents when the data in the scope changes.

051-complex-directives: Illustrates how to use the definition object when implementing a directive. The directive defines a link function that creates a list, and the directive can be applied as an element, attribute, class or comment.

052-using-directive-templates: Illustrates how to use the template property of the directive definition object when creating a directive. This simplifies enormously the intrincacies of the link function, as it nows only has to extract the data and put it into the scope.

053-using-directive-templates-function: Illustrates how to use a function as the template property. This function extracts the contents of the template from a script block in index.html.

054-using-directive-external-template: Illustrates how to use the templateUrl to externalize the HTML contents associated with a directive.

055-using-directive-external-template-functions: Illustrates how to use a function to return the templateUrl that the directive will use.

056-managing-directive-scopes: Demonstrates how all the instances of a directive receives the same scope by default, so that data elements are all synchronized.

057-managing-directive-scopes-multiple-controllers: Demonstrates how to solve the problem associated with 056-, by creating one controller for each instance of the directive.

058-managing-directive-scopes-scope-prop: Demonstrates how to solve the problem associated with 056-, by setting the scope property to true so that each instance of the directive is given a separate scope following the rules of the scope hierarchy.

059-isolated-scopes-one-way-binding: Illustrates how to create a completely isolated scope for each instance of the directive, but also how you can interact with the owning controller scope establishing one-way databindings with the controller scope.

060-isolated-scopes-two-way-binding: Illustrates how to create a completely isolated scope for each instance of the directive, but also how you can interact with the owning controller scope establishing two-way databindings with the controller scope.

061-isolated-scopes-evaluating-expr: Illustrates how to perform a binding with a function defined in the controller.

062-isolated-scopes-evaluating-expr-scope-var: Illustrates how to perform a binding with a function defined in the controller, that also receives data defined in the isolated scope.

063-directive-transclusion: Illustrates how to use transclusion with a directive. In the example, it is created a directive that wraps content in a bootstrap panel.

064-directive-compile: This example contains a directive called simpleRepeater that uses transclusion to repeat a set of elements for each object in an array

065-controller-directives: Illustrate how to create a directive that depends on other directive which features a controller. In the example, there is list of products with text input that accept quantitites. The directive is used to display the elements as a table and the final quantity is computed.

066-custom-form-elements: Illustrate how to use directives to create a complex component (tri-button) that displays three options Yes, No, Not Sure. The selected option can be linked to the model and also a custom validation and formatter are implemented.

067-services: This example is based around three button elements which are generated by the ng-repeat directive from a list of city names defined on the scope by the controller. There is a triButton directive that handles click events from the button elements and updates a counter that is defined by the controller and is data bound using an isolated scope.
This example does not use services, but serves as a starting point for the rest of the chapter examples, and i've left it here because it illustrates very well the directives data binding in an isolated scope.

068-services-creation-factory: Illustrates how to create a service using the Module.factory method, which directly uses the factory function when a dependency for that service is found.

069-services-creation-service: Illustrates how to create a service using the Module.service method, which uses the object returned by the factory function as a constructor, and uses new to create that object. This lets you leverage prototype inheritance.

070-services-creation-provider: Illustrates how to create a service using the Module.provider method, which uses the $get method on the object returned by the factory function to create the service. See 071- to see an example of how to leverage this to provide more functionality in the service.

071-services-creation-provider-config: Illustrates how to leverage the Module.provider method to create a configurable service.

072-services-window-object: Illustrates how to use the $window service to access the DOM window object that for example gives you access to the alert() method.

073-services-document-object: Illustrates how to use the $document object to access the DOM document and register an event handler for a button.

074-services-interval-timeout: Illustrates how to use the $interval service to display the current time to the second on the page.

075-services-location: Illustrates how to use the $location service to set and get the URL components.

076-services-location-murls: demonstrates how to enable the HTML5 History API in the locationProvider so that the `#` is no longer needed to prevent page refresh.

077-services-anchorscroll: demonstrates how to use the $anchorScroll service to automatically scroll to a given anchor when using $location.hash() method.

078-services-anchorscroll-disable: demonstrates how to disable the automatic scrolling when $location.hash is invoked, and how to force scrolling to a given anchor calling the service.

079-services-logging: demonstrates how to use the $log service, which is a wrapper around the console object.

080-services-exceptionhandler-default: Illustrates the default behavior of the $exceptionhandler service, which calls the $log.error method.

081-services-exceptionhandler: Illustrates how to invoke the $exceptionhandler programmatically.

082-services-exceptionhandler-override: Illustrates how to create your own exception handler that overrides the one provided by AngularJS.

083-services-security-sce-default: Illustrates how the sce automatically disables dangerous HTML from being executed.

084-services-security-ngsanitize: Illustrates how to use ng-bind-html directive from the angular-sanitize module to allow some HTML to be rendered on the screen.

085-services-security-sanitize: Illustrates how to use the $sanitize service to programmatically clean the values to be sent to the backend.

086-services-security-sce-disable: Illustrates how to disable $sce so that everthing is displayed as received.

087-services-parse: Illustrate how to use the $parse service to dynamically parse expressions that a user types in a text field.

088-services-parse-advanced: Illustrates a more sensible use of $parse that consists in reading two attributes from a directive and parsing the result back into the DOM after having applied programmatically an expression. In particular in this example, it is calculated a price + tax.

089-services-interpolate: Illustrates the use of $interpolate to achieve the same results as 088-.

090-services-interpolate-no-moustaches: Illustrates how to change the interpolation characters so that {{}} are no longer used to identify inline binding expressions.

091-services-compile: Illustrates how to use $compile service to generate content dynamically in a directive.

092-services-http: Illustrates how to use the $http service to get a JSON document.

093-services-http-xml: Illustrates how to use the $http service to get an XML document. In this case, you are responsible for the parsing of the XML document yourself.

094-services-http-config-transform-response: Illustrates how to use the transformResponse so that the XML parsing occurs automatically.

095-services-http-config-transform-request: Illustrates how to use the transformRequest to implement an XML serializer of a JavaScript object using jqLite.

096-services-http-global-config: Illustrates how to perform global configuration of the $http service using the $httpProvider.

097-services-http-global-interceptors: Illustrate how to use the $httpProvider to register an interceptor that will act on the requests and responses.

098-promises: A simple example of Promises that contains three buttons and inline data binding for a property. The idea is to use the deferred and promise objects to wire up the buttons such that clicking one of them will update the outcome binding.

099-promises-chaining: Illustrates how promises can be chained together. In the example, chaining is used to format the contents that will be used in the outcome binding.

100-promises-grouping: Illustrates how to use the $q.all to group promises. In the example, grouping is used to wait for the use to click on both groups of buttons before a result is bound in the outcome.

101-services-rest-no-connection: The scaffolding for the REST service chapter. This example includes all the logic needed to perform local CRUD operation on products, but do not include any connection to the backend.

102-services-rest-http: Illustrates how to communicate with a RESTful backend using the $http service.
Note that this project requires that backend-app is running on port 9000. See backend-app README.md for more details, but you can start it by typing `mvn spring-boot:run` in your shell.

103-services-rest-http-caveat: Illustrates why it is not recommended to use $http service for interacting with RESTful backends. In the example, a button is added on the table view to increment the price of the product (this is handled by a new directive increment). As this directive is not linked to the $http service, no update is notified to the backend and therefore, if you reload the application, the update in the price will be lost.

104-services-rest-resource: Illustrates how to properly use the ngResource module for dealing with RESTful backends. It is also demonstrated how to use dynamically the RESTful nature of the resources within a directive. See the documentation for more details.

105-services-views-basic: Illustrates the most basic usage of ngRoute module for routing logical views such as '/list' into physical views '/tableView.html'. The example is a transformation of 104- in which the displayMode is removed. The example needs the backend-app, which can be started using `mvn spring-boot:run`.

106-services-views-route-params: Illustrates how you can access route parameters programmatically. In this case, when the user clicks on the edit link, the path is changed to /edit/{{product.id}} so that the editor knows which product is to be edited. In the example, the controller is registered to be notified when the route changes, and when it happens if it matches the /edit/id pattern, the id is extracted.

107-serviews-views-route-controller: Illustrates how to assign a controller to the editorView so that all the editing behavior is handled from that controller.

108-services-views-route-dependencies: Illustrates how to use the resolve configuration property on the route to specify a dependency. In this case, the dependency consists in the data received from the backend.

109-animation-basics: Illustrates how to apply basic fade-in transition to the ng-view. The example requires the backend-app to be running, which you can do by typing `mvn spring-boot:run`.

110-animation-caveats: Demonstrates that when working with animations you shouldn't mind the departure of old content, because during some time both views will be shown and that produces an unappealing effect. The example requires the backend-app to be running, which you can do by typing `mvn spring-boot:run`.

111-touch-basics: Illustrates the basics of the ngTouch module. In particular, the example declares a handler for the swipe events.

112-service-provide: Illustrates how to leverage the $provide.decorate() method to decorate the $log service so that AngularJS uses the service decorated by us to resolve dependencies.

113-service-injector-function-dependencies: Illustrates how to use the $injector.annotate() to obtain the dependecies declared for a function.

114-service-injector-get: Illustrates how to obtain and feed the dependencies into a function so that it can be called programmatically.

115-service-injector-invoke: Illustrates how to use the $injector.invoke method to invoke a function programmatically passing the dependendencies and arguments.

116-hello-unit-testing: Illustrates how to test a simple controller with Jasmine and Karma.

117-unit-test-mock-http: Illustrates how to configure the $httpBackend mock object to mock $http requests.

118-unit-test-mock-interval-timeout: Illustrates how to leverage $interval and $timeout mock objects to trigger the callback actions associated to $interval and $timeout.

119-unit-test-mock-log: Illustrates how to use the $log mock object to check that the application is correctly logging messages.

120-unit-test-filter: Illustrates how to unit test a filter.

121-unit-test-directive: Illustreates how to unit test a directive. Note that in this example we cannot apply the directive to the result of the $http.get because $http.get returns a promise and not the actual data. because of that, when the directive is executed, $scope.products is always undefined. Thus, in the example an static array is defined.
