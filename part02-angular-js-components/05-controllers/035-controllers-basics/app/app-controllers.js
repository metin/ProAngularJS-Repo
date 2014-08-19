(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('SimpleController', ['$scope', function($scope) {

            $scope.cities = ['London', 'New York', 'Paris'];

            $scope.city = 'London';

            $scope.getCountry = function(city) {
                switch (city) {
                    case 'London' :
                        return 'UK';
                    case 'New York' :
                        return 'USA';
                }
            };
        }]);
})();