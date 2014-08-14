(function() {
    'use strict';

    var controllersModule = angular.module('exampleApp.Controllers', ['exampleApp.Services']);

    controllersModule.controller('DayController', ['$scope', 'daysService', function($scope, daysService) {
        $scope.day = daysService.today;
    }]);

    controllersModule.controller('TomorrowController', ['$scope', 'daysService', function($scope, daysService) {
        $scope.day = daysService.tomorrow;
    }]);
})();