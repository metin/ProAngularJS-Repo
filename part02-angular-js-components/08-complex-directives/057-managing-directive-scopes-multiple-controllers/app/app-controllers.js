(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.name = '';
        }])
        .controller('ScopeController1', [function() {
            // Nothing to do
        }])
        .controller('ScopeController2', [function() {
            // Nothing to do
        }]);
})();