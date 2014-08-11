(function() {
    'use strict';

    angular.module('sportsStore')
        .filter('unique', function() {
            function isPropertyInObject(obj, propName) {
                if (angular.isDefined(obj[propName])) {
                    return true;
                } else {
                    return false;
                }
            }

            return function(items, propName) {
                var uniquePropValues = [];
                var propValuesFound = {};
                var propValue = null;
                if (angular.isArray(items) && angular.isString(propName)) {
                    angular.forEach(items, function(item) {
                        propValue = item[propName];

                        if (!isPropertyInObject(propValuesFound, propValue)) {
                            propValuesFound[propValue] = true; // now it is defined
                            uniquePropValues.push(propValue); 
                        } 
                    });
                    return uniquePropValues;
                } else {
                    return items; // there was nothing we could do
                }
            };
        });

})();