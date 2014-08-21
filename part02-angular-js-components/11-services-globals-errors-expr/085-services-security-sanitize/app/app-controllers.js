(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$sanitize', function($scope, $sanitize) {
            $scope.htmlData = '<p>This is <b onmouseover=alert("attack!")>dangerous</b> data</p>';

            $scope.$watch('htmlData', function(newValue) {
                $scope.htmlData = $sanitize(newValue);
            });
        }]);
})();