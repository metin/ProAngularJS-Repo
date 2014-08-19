(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('TopLevelController', ['$scope', function($scope) {

            $scope.dataValue = 'Hello, Adam';

            $scope.reverseText = function() {
                $scope.dataValue = $scope.dataValue.split('').reverse().join('');
            };

            $scope.changeCase = function() {
                var result = [];
                angular.forEach($scope.dataValue.split(''), function(char, index) {
                    result.push(index % 2 === 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
                });
                $scope.dataValue = result.join('');
            };

        }])
        .controller('ChildController1', ['$scope', function($scope) {
            $scope.changeCase = function() {
                $scope.dataValue = $scope.dataValue.toUpperCase();
            };
        }])
        .controller('ChildController2', ['$scope', function($scope) {
            $scope.changeCase = function() {
                $scope.dataValue = $scope.dataValue.toLowerCase();
            };

            $scope.shiftFour = function() {
                var result = [];
                angular.forEach($scope.dataValue.split(''), function(char, index) {
                    result.push(index < 4 ? char.toUpperCase() : char);
                });
                $scope.dataValue = result.join('');
            };
        }]);
})();