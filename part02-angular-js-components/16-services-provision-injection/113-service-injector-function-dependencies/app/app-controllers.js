(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$injector', function($scope, $injector) {
            var counter = 0;

            var logClick = function($log, $exceptionHandler, message) {
                if (counter === 0) {
                    $log.log(message);
                    counter++;
                } else {
                    $exceptionHandler('Already clicked');
                }
            };

            $scope.handleClick = function() {
                var dependencies = $injector.annotate(logClick);
                for (var i = 0; i < dependencies.length; i++) {
                    console.log('Dependency[' + i + ']: ' + dependencies[i]);
                }
            };

        }]);
})();