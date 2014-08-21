(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
            $scope.itemCount = 250;
            $scope.items = [];

            for (var i = 0; i < $scope.itemCount; i++) {
                $scope.items[i] = 'Item ' + i;
            }

            $scope.show = function(id) {
                $location.hash(id);
                // only scroll to bottom, scroll to top disabled
                if (id === 'bottom') {
                    $anchorScroll();
                }
            };
        }]);
})();