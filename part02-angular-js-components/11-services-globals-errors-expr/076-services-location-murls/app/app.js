/*jshint browser: true */
(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$locationProvider', function($locationProvider) {
            if (window.history && history.pushState) {
                $locationProvider.html5Mode(true);
            }
        }]);

})();