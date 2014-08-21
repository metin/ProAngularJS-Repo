(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.throwEx = function() {
                throw new Error('Fabricated exception');
            };
        }]);
})();