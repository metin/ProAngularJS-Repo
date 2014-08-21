/*jshint sub:true, unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('evalExpression', ['$compile', function($compile) {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    var content = '<ul><li ng-repeat="city in cities">{{city}}</li></ul>';
                    var listElem = angular.element(content);
                    var compileFn = $compile(listElem);
                    compileFn(scope);
                    elem.append(listElem);
                }
            };
        }]);
})();