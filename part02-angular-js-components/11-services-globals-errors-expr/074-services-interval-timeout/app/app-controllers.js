(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$interval', function($scope, $interval) {
            $interval(function() {
                $scope.time = new Date().toTimeString();
            }, 1000);

        }]);
})();