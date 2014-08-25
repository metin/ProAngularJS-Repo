(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives', 'ngResource', 'ngRoute'])
        .constant('baseUrl', 'http://localhost:9000/server/rest/products/')
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

            $routeProvider.when('/edit/:id', {
                templateUrl: '/editorView.html',
                controller: 'EditController',
                controllerAs: 'editCtrl'
            });

            $routeProvider.when('/create', {
                templateUrl: '/editorView.html',
                controller: 'EditController',
                controllerAs: 'editCtrl'
            });

            $routeProvider.otherwise({
                templateUrl: '/tableView.html'
            });
        }]);
})();