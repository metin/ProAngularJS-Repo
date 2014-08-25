(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', '$interval', '$timeout',
                function($scope, $http, $interval, $timeout) {
            $scope.counter = 0;

            $scope.incrementCounter = function() {
                $scope.counter++;
            };

            $http.get('productData.json').success(function(data) {
                $scope.products = data;
            });

            $scope.intervalCounter = 0;
            $scope.timerCounter = 0;

            $interval(function() {
                $scope.intervalCounter++;
            }, 5000, 10);

            $timeout(function() {
                $scope.timerCounter++;
            }, 5000);
        }]);
})();