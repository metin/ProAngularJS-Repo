(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', '$log', function($scope, $http, $log) {
            $scope.loadData = function() {
                $http.get('http:/this-does-not-exist-but-interceptor-will-overwrite.io')
                    .success(function(data, status, headers) {
                        $scope.products = data;
                        $log.debug('status: ' + status);
                        $log.debug('headers(content-type): ' + headers('content-type'));
                        $log.debug('headers(content-length): ' + headers('content-length'));
                    });
            };
        }]);
})();