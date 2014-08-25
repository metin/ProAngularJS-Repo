(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives', 'ngResource', 'ngRoute'])
        .constant('baseUrl', 'http://localhost:9000/server/rest/products/')
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

            $routeProvider.when('/list', {
                templateUrl: '/tableView.html'
            });

            $routeProvider.when('/edit/:id', {
                templateUrl: '/editorView.html'
            });

            $routeProvider.when('/create', {
                templateUrl: '/editorView.html'
            });

            $routeProvider.otherwise({
                templateUrl: '/tableView.html'
            });
        }]);
})();