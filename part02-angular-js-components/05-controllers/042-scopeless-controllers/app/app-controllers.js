(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('TopLevelController', [function() {

            this.data = {
                dataValue : 'Hello, Adam'
            };

            this.reverseText = function() {
                this.data.dataValue = this.data.dataValue.split('').reverse().join('');
            };
        }]);
})();