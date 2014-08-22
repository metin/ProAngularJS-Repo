(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push(function($log) {
                return {
                    request: function(config) {
                        config.url = 'productData.json';
                        return config;
                    },
                    response: function(response) {
                        $log.info('response length: ' + response.data.length);
                        return response;
                    }
                };
            });
        }]);

})();