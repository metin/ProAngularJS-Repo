(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.data = {
                cities: ['London', 'New York', 'Paris'],
                totalClicks: 0
            };

            $scope.$watch('data.totalClicks', function(newVal) {
                console.log('Total click count: ' + newVal);
            });
        }]);
})();