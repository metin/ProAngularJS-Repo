(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.requireValue = true;
            $scope.matchPattern = /^[a-z]/; // text must begin with a-z

        }]);
})();