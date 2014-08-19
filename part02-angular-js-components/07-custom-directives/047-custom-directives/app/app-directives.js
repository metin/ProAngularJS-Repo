/* jshint sub:true */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('unorderedList', [function(){
            return function (scope, element, attrs) {
                var data = scope[attrs['unorderedList']];
                if (angular.isArray(data)) {
                    // title for the list
                    var listTitle = angular.element('<h3>');
                    listTitle.text('Unordered List of Products');
                    element.append(listTitle);

                    // list of products
                    var listElem = angular.element('<ul>');
                    element.append(listElem);
                    for (var i = 0; i < data.length; i++) {
                        listElem.append(angular.element('<li>').text(data[i].name));
                        console.log('Item: ' + data[i].name);
                    }
                }
            };
        }]);
})();