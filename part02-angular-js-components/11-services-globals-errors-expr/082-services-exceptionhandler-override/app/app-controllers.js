(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$exceptionHandler', function($scope, $exceptionHandler) {
            $scope.throwEx = function() {
                try {
                    throw new Error('Fabricated Exception');
                } catch (e) {
                    $exceptionHandler(e, 'user clicked on the exception button');
                }
            };
        }]);
})();