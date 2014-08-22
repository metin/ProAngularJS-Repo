(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .constant('baseUrl', 'http://localhost:9000/server/rest/products/');
})();