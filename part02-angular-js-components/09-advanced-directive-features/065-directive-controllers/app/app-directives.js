/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('productItem', [function() {
            return {
                templateUrl: 'productTemplate.html',
                require: '^productTable',
                link: function(scope, element, attrs, ctrl) {
                    scope.$watch('item.quantity', function() {
                        ctrl.updateTotal();
                    });
                }
            };
        }])
        .directive('productTable', [function() {
            return {
                transclude: true,
                scope: {
                    value: '=productTable',
                    data: '=productData'
                },
                controller: function($scope, $element, $attrs) {
                    this.updateTotal = function() {
                        var total = 0;
                        for (var i = 0; i < $scope.data.length; i++) {
                            total += Number($scope.data[i].quantity);
                        }
                        $scope.value = total;
                    };
                }
            };
        }])
        .directive('resetTotals', function() {
            return {
                scope: {
                    data: '=productData',
                    propname: '@propertyName'
                },
                templateUrl: 'resetTemplate.html',
                require: '^productTable',
                link: function(scope, element, attrs, ctrl) {
                    scope.reset = function() {
                        for (var i = 0; i < scope.data.length; i++) {
                            scope.data[i][scope.propname] = 0;
                        }
                        ctrl.updateTotal();
                    };
                }
            };
        });
})();