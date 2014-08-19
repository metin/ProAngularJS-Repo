/* jshint sub:true */
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
                        // This must be inherently unsecure
                        listElem.append(angular.element('<li>').text(scope.$eval(propertyExpression, data[i])));
                    }
                }
            };
        }]);
})();