(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.dataSource = 'controller';
        }]);
})();