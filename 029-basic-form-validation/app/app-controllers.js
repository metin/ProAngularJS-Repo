(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.addUser = function(userDetails) {
                $scope.message = userDetails.name +
                    ' (' + userDetails.email + ') (' + userDetails.agreed + ')';
            };

            $scope.message = 'Ready';

        }]);
})();