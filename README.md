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
