/*jshint browser: true */
(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$anchorScrollProvider', function($anchorScrollProvider) {
            $anchorScrollProvider.disableAutoScrolling();
        }]);
})();