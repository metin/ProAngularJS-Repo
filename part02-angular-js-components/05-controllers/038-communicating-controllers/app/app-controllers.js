(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('SimpleController', ['$scope', '$rootScope', function($scope, $rootScope) {

            $scope.$on('zipCodeUpdated', function(event, args) {
                $scope[args.type] = args.zipCode;
            });

            $scope.setAddress = function(type, zip) {
                $rootScope.$broadcast('zipCodeUpdated', {type: type, zipCode: zip});
                console.log('Type: ' + type + ' ' + zip);
            };

            $scope.copyAddress = function() {
                $scope.shippingZip = $scope.billingZip;
            };

        }]);
})();