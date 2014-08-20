/* jshint sub:true, browser: true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('scopeDemo', [function() {
            return {
                template: '<div class="panel-body"><p> Data Value: {{local}}</p>',
                scope: {
                    local: '@nameprop'
                }
            };
        }]);
})();