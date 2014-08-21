/*jshint sub:true, unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('evalExpression', ['$parse', function($parse) {
            var expressionFn = $parse('total | currency');

            return {
                scope: {
                    amount: '=amount',
                    tax: '=tax'
                },
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    scope.$watch('amount', function(newValue) {
                        var localData = {
                            total: Number(newValue) + (Number(newValue) * (Number(scope.tax) / 100))
                        };
                        elem.text(expressionFn(scope, localData));
                    });
                }
            };
        }]);
})();