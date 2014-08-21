(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.cities = ['London', 'Paris', 'New York'];
        }]);
})();