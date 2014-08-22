/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('triButton', ['logService', function(logService) {
            return {
                scope: {
                    counter: '=counter'
                },
                link: function(scope, element, attrs) {
                    element.on('click', function(event) {
                        logService.log('Button click: ' + event.target.innerText);
                        scope.$apply(function() {
                            scope.counter++;
                        });
                    });
                }
            };
        }]);
})();