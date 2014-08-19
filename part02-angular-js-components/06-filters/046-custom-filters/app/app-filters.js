
(function() {
    'use strict';

    angular.module('exampleApp.Filters', [])
        .filter('labelCase', function() {
            return function(value, reverse) {
                if (angular.isString(value)) {
                    var temp = reverse ? value.toUpperCase() : value.toLowerCase();
                    return (reverse ? temp[0].toLowerCase() : temp[0].toUpperCase()) + temp.substr(1);
                }
            };
        })
        .filter('skip', function() {
            return function(data, count) {
                if (angular.isArray(data) && angular.isNumber(Number(count))) {
                    if (count > data.length || count < 1) {
                        return data;
                    } else {
                        return data.slice(count);
                    }
                } else {
                    return data;
                }
            };
        })
        .filter('take', ['$filter', function($filter) {
            return function(data, skipCount, takeCount) {
                var skippedData = $filter('skip')(data, skipCount);
                return $filter('limitTo')(skippedData, takeCount);
            };
        }]);
})();