/*jshint sub:true, unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('evalExpression', ['$interpolate', function($interpolate) {
            var interpolationFn = $interpolate('The total amount is: {{total | currency}} (including taxes)');

            return {
                scope: {
                    amount: '=amount',
                    tax: '=tax'
                },
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    scope.$watch('amount', function(newValue) {
                        scope.total = Number(newValue) + (Number(newValue) * (Number(scope.tax) / 100));
                        elem.text(interpolationFn(scope));
                    });
                }
            };
        }]);
})();