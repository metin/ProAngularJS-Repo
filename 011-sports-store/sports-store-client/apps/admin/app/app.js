(function() {
    'use strict';

    var app = angular.module('sportsStoreAdmin', ['ngRoute', 'ngResource']);

    app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/login', {templateUrl: 'components/login/adminLogin.html'});
        $routeProvider.when('/main', {templateUrl: 'components/admin/adminMain.html'});
        $routeProvider.otherwise({redirectTo: '/login'});

        $httpProvider.defaults.withCredentials = true;
    }]);
})();
