
(function() {
    'use strict';

    angular.module('exampleApp.Filters', [])
        .filter('dayName', [function() {
            var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return function(inputData) {
                return angular.isNumber(inputData) ? dayNames[inputData] : inputData;
            };
        }]);
})();