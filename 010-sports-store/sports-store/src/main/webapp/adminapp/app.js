(function() {
    'use strict';

    var app = angular.module('sportsStoreAdmin', ['ngRoute', 'ngResource']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {templateUrl: 'components/login/adminLogin.html'});
        $routeProvider.when('/main', {templateUrl: 'components/admin/adminMain.html'});
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
})();
