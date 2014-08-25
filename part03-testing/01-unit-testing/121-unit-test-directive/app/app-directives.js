(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('unorderedList', [function() {
            return {
                link: function(scope, element, attrs) {
                    /*jshint sub:true */
                    var data = scope[attrs['unorderedList']];
                    /*jshint sub:false */
                    if (angular.isArray(data)) {
                        var listElem = angular.element('<ul>');
                        element.append(listElem);
                        for (var i = 0; i < data.length; i++) {
                            listElem.append(angular.element('<li>').text(data[i].name));
                        }
                    }
                }
            };
        }]);
})();