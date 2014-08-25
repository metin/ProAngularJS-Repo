(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', function($scope, $http) {
            $scope.counter = 0;

            $scope.incrementCounter = function() {
                $scope.counter++;
            };

            $http.get('productData.json').success(function(data) {
                $scope.products = data;
            });
        }]);
})();