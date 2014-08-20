/* jshint sub:true, browser: true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('scopeDemo', [function() {
            return {
                templateUrl: 'scopeTemplate.html',
                scope: {
                    local: '=nameprop',
                    cityFn: '&city'
                }
            };
        }]);
})();