(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$window', function($scope, $window) {
            $scope.displayAlert = function(msg) {
                $window.alert(msg);
            };
        }]);
})();