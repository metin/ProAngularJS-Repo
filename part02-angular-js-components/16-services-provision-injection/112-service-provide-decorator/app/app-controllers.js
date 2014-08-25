(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$log', function($scope, $log) {
            $scope.handleClick = function() {
                $log.log('Button clicked');
            };
        }]);
})();