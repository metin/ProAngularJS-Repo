(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('SimpleController', ['$scope', function($scope) {

            $scope.setAddress = function(type, zip) {
                console.log('Type: ' + type + ' ' + zip);
            };

            $scope.copyAddress = function() {
                $scope.shippingZip = $scope.billingZip;
            };

        }]);
})();