(function () {
    'use strict';

    var app = angular.module('exampleApp', []);

    app.controller('TodayController', ['$scope', 'daysService', function($scope, daysService) {
        $scope.dayName = daysService.today;

    }]);

    app.controller('TomorrowController', ['$scope', 'daysService', function($scope, daysService) {
        $scope.tomorrow = daysService.tomorrow;
    }]);

    app.directive('highlight', ['$filter', function($filter) {
        return function(scope, element, attrs) {
            var dayFilter = $filter('dayName');
            if (dayFilter(scope.dayName) === attrs.highlight) {
                element.css('color', 'red');
            }
        };
    }]);

    app.filter('dayName', [function() {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];
        return function(input) {
            return angular.isNumber(input) ? dayNames[input] : input;
        };
    }]);

    app.service('daysService', ['nowValue', function(nowValue) {
        this.today = nowValue;
        this.tomorrow = nowValue + 1;
    }]);

    var now = new Date();
    app.value('nowValue', now);
})();