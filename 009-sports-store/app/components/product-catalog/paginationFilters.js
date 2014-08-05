(function() {
    'use strict';

    angular.module('sportsStore')
        .filter('pageCount', function() {
            // returns an array with the available page indexes: [1, 2, 3, etc.]
            return function(items, itemsPerPage) {
                if (angular.isArray(items)) {
                    var result = [];
                    for (var i = 0; i < Math.ceil(items.length / itemsPerPage); i++) {
                        result.push(i);
                    }
                    return result;
                } else {
                    return items; // There was nothing we could do
                }
            };
        })
        .filter('range', ['$filter', function($filter){
            return function(items, page, itemsPerPage) {
                if (angular.isArray(items) && angular.isNumber(page) && angular.isNumber(itemsPerPage)) {
                    var startIndex = (page - 1) * itemsPerPage;
                    if (items.length < startIndex) {
                        return [];
                    } else {
                        return $filter('limitTo')(items.splice(startIndex), itemsPerPage); // uses the limitTo built-in filter
                    }
                } else {
                    return items; // There was nothing we could do
                }
            };            
        }]);
})();