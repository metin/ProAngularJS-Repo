(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers', 'exampleApp.Directives'])
        .config(['$interpolateProvider', function($interpolateProvider) {
            $interpolateProvider.startSymbol('!!');
            $interpolateProvider.endSymbol('!!');
        }]);

})();