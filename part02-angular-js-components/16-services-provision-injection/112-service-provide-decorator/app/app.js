(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$provide', function($provide) {
            $provide.decorator('$log', function($delegate) {
                $delegate.originalLog = $delegate.log;
                $delegate.log = function(message) {
                    $delegate.originalLog('Decorated: ' + message);
                };
                return $delegate;
            });
        }]);

})();