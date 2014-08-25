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
                var args = [];
                for (var i = 0; i < dependencies.length; i++) {
                    if ($injector.has(dependencies[i])) {
                        args.push($injector.get(dependencies[i]));
                    } else {
                        if (dependencies[i] === 'message') {
                            args.push('Button clicked');
                        }
                    }
                }
                logClick.apply(null, args);
            };

        }]);
})();