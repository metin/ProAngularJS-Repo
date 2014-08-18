(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('tap', [function() {
            return function(scope, elem, attrs) {
                elem.on('touchstart touchend', function() {
                    scope.$apply(attrs['tap']);
                });
            };
        }]);
})();