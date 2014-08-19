(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.products = [
                {name: 'Apples', category: 'Fruit', price: 1.20, expiry: 10},
                {name: 'Bananas', category: 'Fruit', price: 2.42, expiry: 7},
                {name: 'Pears', category: 'Fruit', price: 2.02, expiry: 6}
            ];

            $scope.getExpiryDate = function(days) {
                var now = new Date();
                return now.setDate(now.getDate() + days);
            };
        }]);
})();