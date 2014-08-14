(function () {
    'use strict';

    var app = angular.module('exampleApp',
        ['exampleApp.Controllers',
         'exampleApp.Filters',
         'exampleApp.Services',
         'exampleApp.Directives']);


    app.config(function(startTime) {
        console.log('exampleApp Module Config: startTime=' + startTime);
    });
    app.run(function(startTime) {
       console.log('exampleApp Module Run: ' + startTime);
    });

    var now = new Date();
    app.value('nowValue', now);
    app.constant('startTime', new Date().toLocaleTimeString());
})();