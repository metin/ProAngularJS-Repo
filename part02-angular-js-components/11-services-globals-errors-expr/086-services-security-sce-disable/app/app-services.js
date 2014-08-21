/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Services', [])
        .factory('$exceptionHandler', ['$log', function($log){
            return function(exception, cause) {
                $log.error('Message: ' + exception.message + '(Cause: ' + cause + ')');
            };
        }]);
})();