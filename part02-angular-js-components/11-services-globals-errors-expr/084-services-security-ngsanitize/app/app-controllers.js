(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.htmlData = '<p>This is <b onmouseover=alert("attack!")>dangerous</b> data</p>';
        }]);
})();