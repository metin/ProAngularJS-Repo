(function() {
    'use strict';

    angular.module('exampleApp.Directives', ['exampleApp.Filters'])
        .directive('highlight', ['$filter', function($filter) {
            return function(scope, element, attrs) {
                var dayFilter = $filter('dayName');
                if (dayFilter(scope.day) === attrs.highlight) {
                    element.css('color', 'red');
                }
            };
    }]);
})();