/* jshint sub:true, loopfunc:true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('unorderedList', [function(){
            return function (scope, element, attrs) {
                var data = scope[attrs['unorderedList']];
                var propertyExpression = attrs['listProperty'];
                var listTitleText = attrs['listTitle'];

                if (angular.isArray(data)) {
                    // title for the list
                    var listTitle = angular.element('<h3>');
                    listTitle.text(listTitleText);
                    element.append(listTitle);

                    // list of products
                    var listElem = angular.element('<ul>');
                    element.append(listElem);
                    for (var i = 0; i < data.length; i++) {
                        (function() {
                            var itemElement = angular.element('<li>');
                            listElem.append(itemElement);
                            var index = i;
                            var watcherFn = function(watchScope) {
                                return watchScope.$eval(propertyExpression, data[index]);
                            };
                            scope.$watch(watcherFn, function(newValue, oldValue) {
                                console.log('Value has changed: ' + oldValue + ' -> ' + newValue);
                                itemElement.text(newValue);
                            });
                        })();
                    }
                }
            };
        }]);
})();