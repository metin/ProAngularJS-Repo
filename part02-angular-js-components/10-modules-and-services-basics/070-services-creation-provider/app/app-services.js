/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Services', [])
        .provider('logService', [function() {
            return {
                $get: function() {
                    return {
                        messageCount: 0,
                        log: function(msg) {
                            console.log('(LOG +' + (this.messageCount++) + ') ' + msg);
                        }
                    };
                }
            };
        }]);

})();