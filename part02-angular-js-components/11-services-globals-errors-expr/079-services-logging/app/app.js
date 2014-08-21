(function () {
    'use strict';

    angular.module('exampleApp',
                ['exampleApp.Controllers',
                 'exampleApp.Directives',
                 'exampleApp.Services'])
        .config(['logServiceProvider', function(logServiceProvider) {
            logServiceProvider.debugEnabled(true).messageCounterEnabled(false);
        }]);
})();