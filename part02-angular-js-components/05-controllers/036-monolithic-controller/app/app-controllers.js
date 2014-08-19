(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('SimpleController', ['$scope', function($scope) {

            $scope.addresses = {};

            $scope.setAddress = function(type, zip) {
                console.log('Type: ' + type + ' ' + zip);
                $scope.addresses[type] = zip;
            };

            $scope.copyAddress = function() {
                $scope.shippingZip = $scope.billingZip;
            };

        }]);
})();