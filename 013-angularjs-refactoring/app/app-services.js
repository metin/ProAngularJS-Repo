(function() {
    'use strict';

    angular.module('exampleApp.Services', ['exampleApp'])
        .config([function(startTime) {
            console.log('Services module config:  startTime=' + startTime);
        }])
        .run(['startTime', function(startTime) {
            console.log('Services module run:  startTime=' + startTime);
        }])
        .service('daysService', ['nowValue', function(nowValue) {
            this.today = nowValue.getDay();
            this.tomorrow = nowValue.getDay() + 1;
    }]);
})();