/* global userForm */
(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.addUser = function(userDetails) {
                if (userForm.$valid) {
                    $scope.message = userDetails.name +
                        ' (' + userDetails.email + ') (' + userDetails.agreed + ')';
                } else {
                    $scope.showValidation = true;
                }

            };

            $scope.message = 'Ready';

            $scope.getError = function(error) {
                if (angular.isDefined(error)) {
                    if (error.required) {
                        return 'Please enter a value';
                    } else if (error.email) {
                        return 'Please enter a valid email address';
                    }
                }
            };

        }]);
})();