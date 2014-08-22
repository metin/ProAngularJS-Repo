(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives', 'ngResource'])
        .constant('baseUrl', 'http://localhost:9000/server/rest/products/');
})();