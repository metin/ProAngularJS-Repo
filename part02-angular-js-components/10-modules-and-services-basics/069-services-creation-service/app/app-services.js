/*jshint unused:false */
(function() {
    'use strict';

/* EloquentJS syntax ***************
    function BaseLogger() {
        this.messageCount = 0;
    }

    BaseLogger.prototype.log = function(msg) {
        console.log(this.msgType + ':' + (this.messageCount++) + ': ' + msg);
    };

    function DebugLogger() {
        BaseLogger.call(this);
    }
    DebugLogger.prototype = Object.create(BaseLogger.prototype);
    DebugLogger.prototype.msgType = 'DEBUG';

    function ErrorLogger() {
        BaseLogger.call(this);
    }
    ErrorLogger.prototype = Object.create(ErrorLogger.prototype);
    ErrorLogger.prototype.msgType = 'ERROR';
*/

/* ProAngularJS style */
    function BaseLogger() {
        this.messageCount = 0;
    }

    BaseLogger.prototype.log = function(msg) {
        console.log(this.msgType + ':' + (this.messageCount++) + ': ' + msg);
    };

    function DebugLogger() {
    }
    DebugLogger.prototype = new BaseLogger();
    DebugLogger.prototype.msgType = 'DEBUG';

    function ErrorLogger() {
    }
    ErrorLogger.prototype = new BaseLogger();
    ErrorLogger.prototype.msgType = 'ERROR';


    angular.module('exampleApp.Services', [])
        .service('logService', DebugLogger)
        .service('errorService', ErrorLogger);

})();