/* jshint sub:true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('unorderedList', [function() {
            return {
                link: function(scope, element, attrs) {
                    scope.data = scope[attrs['unorderedList']];
                    scope.listTitleText = attrs['listTitle'];
                },
                restrict: 'A',
                template: '<h3>{{listTitleText}}</h3><ul><li ng-repeat="item in data">{{item.price | currency}}</li></ul>'
            };
        }]);
})();