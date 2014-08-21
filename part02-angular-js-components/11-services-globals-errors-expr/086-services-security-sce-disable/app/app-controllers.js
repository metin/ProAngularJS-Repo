(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$sce', function($scope, $sce) {
            $scope.htmlData = '<p>This is <b onmouseover=alert("attack!")>dangerous</b> data</p>';

            $scope.$watch('htmlData', function(newValue) {
                $scope.trustedHtmlData = $sce.trustAsHtml(newValue);
            });
        }]);
})();