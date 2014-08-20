/* jshint sub:true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('unorderedList', [function() {
            return {
                link: function(scope, element, attrs) {
                    var data = scope[attrs['unorderedList'] || attrs['listSource']];
                    var propertyExpression = attrs['listProperty'] || 'price | currency';
                    var listTitleText = attrs['listTitle'] || 'List Title';

                    if (angular.isArray(data)) {
                        // title for the list
                        var listTitle = angular.element('<h3>');
                        listTitle.text(listTitleText);
                        if (element[0].nodeName === '#comment') {
                            element.parent().append(listTitle);
                        } else {
                            element.append(listElem);
                        }
                        element.append(listTitle);

                        // list of products
                        var listElem = angular.element('<ul>');
                        if (element[0].nodeName === '#comment') {
                            element.parent().append(listElem);
                        } else {
                            element.append(listElem);
                        }
                        for (var i = 0; i < data.length; i++) {
                            var itemElement = angular.element('<li>').text(scope.$eval(propertyExpression, data[i]));
                            listElem.append(itemElement);
                        }
                    }
                },
                restrict: 'EACM' // allows the directiy to be applied as Element, Attribite, Class and Comment
            };
        }]);
})();