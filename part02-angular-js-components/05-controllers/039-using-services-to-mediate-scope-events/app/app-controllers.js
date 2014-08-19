(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('SimpleController', ['$scope', 'zipCodes', function($scope, zipCodes) {

            $scope.$on('zipCodeUpdated', function(event, args) {
                $scope[args.type] = args.zipCode;
            });

            $scope.setAddress = function(type, zip) {
                zipCodes.setZipCode(type, zip);
                console.log('Type: ' + type + ' ' + zip);
            };

            $scope.copyAddress = function() {
                $scope.shippingZip = $scope.billingZip;
            };

        }]);
})();