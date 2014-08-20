(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.products = [
                {name: 'Apples', price: 1.20},
                {name: 'Bananas', price: 2.42},
                {name: 'Pears', price: 2.02}
            ];

            $scope.changeData = function() {
                $scope.products.push({name: 'Cherries', price: 4.02});
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.products[i].price++;
                }
            };
        }]);
})();