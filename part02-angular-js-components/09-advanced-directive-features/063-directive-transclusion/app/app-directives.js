/*jshint unused: false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('panel', [function() {
            return {
                link: function(scope, element, attrs) {
                    scope.dataSource = 'directive';
                },
                templateUrl: 'panelTemplate.html',
                transclude: true,
                restrict: 'E',
                scope: true  // set to false if you want to share scopes instead of use controller's
            };
        }]);
})();