(function() {
    'use strict';

    angular.module('exampleApp.Services', [])
        .factory('logService', function() {
            var messageCount = 0;
            return {
                log: function(msg) {
                    console.log('LOGSERVICE[' + messageCount++ + ']:' + msg);
                }
            };
        });

})();