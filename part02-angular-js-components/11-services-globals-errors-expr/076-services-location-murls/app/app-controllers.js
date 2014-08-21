(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$location', function($scope, $location) {
            $scope.$on('$locationChangeSuccess', function(event, newUrl) {
                $scope.url = newUrl;
                $scope.host = $location.host(newUrl);
            });

            $scope.setUrl = function(component) {
                switch (component) {
                    case 'reset':
                        $location.path('');
                        $location.hash('');
                        $location.search('');
                        break;

                    case 'path':
                        $location.path('/cities/london');
                        break;

                    case 'search':
                        $location.search('select', 'hotels');
                        break;

                    case 'hash':
                        $location.hash('north');
                        break;

                    case 'url':
                        $location.url('/cities/london?select=hotels#north');
                        break;
                }
            };
        }]);
})();