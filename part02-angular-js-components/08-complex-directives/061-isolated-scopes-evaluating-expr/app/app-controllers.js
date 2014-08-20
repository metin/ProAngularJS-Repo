(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.data = {
                name: 'Adam',
                defaultCity: 'London'
            };

            $scope.getCity = function(name) {
                return name === 'Adam' ? $scope.data.defaultCity : 'Unknown';
            };
        }]);
})();