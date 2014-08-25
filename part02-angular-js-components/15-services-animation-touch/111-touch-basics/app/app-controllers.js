(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.swipeType = '<None>';
            $scope.handleSwipe = function(direction) {
                $scope.swipeType = direction;
            };
        }]);
})();