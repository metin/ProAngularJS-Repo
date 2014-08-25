(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', '$interval', '$timeout', '$log', 'counterService',
                function($scope, $http, $interval, $timeout, $log, counterService) {
            $scope.counter = 0;

            $scope.categories = [{name: 'Fruit'}, {name: 'Fish'}, {name: 'Drink'}];

            $scope.incrementCounter = function() {
                $scope.counter++;
            };

            $http.get('productData.json').success(function(data) {
                $scope.products = data;
                $log.log('There are ' + data.length + ' item(s).');
            });

            $scope.intervalCounter = 0;
            $scope.timerCounter = 0;

            $interval(function() {
                $scope.intervalCounter++;
            }, 5000, 10);

            $timeout(function() {
                $scope.timerCounter++;
            }, 5000);

            $scope.incrementValue = function() {
                counterService.incrementCounter();
            };

            $scope.getCurrentValue = function() {
                return counterService.getCounter();
            };
        }]);
})();