/*jshint sub:true, unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('evalExpression', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    scope.$watch(attrs['evalExpression'], function(newValue) {
                        var result;
                        try {
                            var expressionFn = $parse(scope.expr);
                            result = expressionFn(scope);
                            if (angular.isUndefined(result)) {
                                result = 'No result';
                            }
                        } catch (ex) {
                            result = 'Cannot evaluate expression';
                        }
                        elem.text(result);
                    });
                }
            };
        }]);
})();