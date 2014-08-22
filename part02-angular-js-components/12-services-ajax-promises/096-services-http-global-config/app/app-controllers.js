(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', function($scope, $http) {
            $scope.loadData = function() {
                $http.get('productData.xml')
                    .success(function(data) {
                        $scope.products = data;
                    });
            };
        }]);
})();