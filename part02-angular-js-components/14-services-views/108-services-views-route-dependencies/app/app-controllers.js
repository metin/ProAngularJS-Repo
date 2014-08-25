/*jshint sub:true, ignore:start */
(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$location', 'productsResource', '$route',
                function($scope, $location, productsResource, $route) {

            $scope.data = {};

            $scope.deleteProduct = function(product) {
                product.$delete().then(function() {
                    $scope.data.products.splice($scope.data.products.indexOf(product), 1);
                });
                $location.path('/list');
            };

            $scope.createProduct = function(product) {
                new productsResource(product).$create().then(function(newProduct) {
                    $scope.data.products.push(newProduct);
                    $location.path('/list');
                });
            };

            $location.path('/list');
        }])
        .controller('EditController', ['$scope', '$routeParams', '$location',
                function($scope, $routeParams, $location) {

            $scope.currentProduct = null;

            if ($location.path().indexOf('/edit/') === 0) {
                var id = Number($routeParams['id']);
                for (var i = 0; i < $scope.data.products.length; i++) {
                    if ($scope.data.products[i].id === id) {
                        $scope.currentProduct = $scope.data.products[i];
                        break;
                    }
                }
            }

            $scope.cancelEdit = function() {
                $location.path('/list');
            };

            $scope.updateProduct = function(product) {
                product.$save();
                $location.path('/list');
            };

            $scope.saveEdit = function(product) {
                if (angular.isDefined(product.id)) {
                    $scope.updateProduct(product);
                } else {
                    $scope.createProduct(product);
                }
                $scope.currentProduct = {};
            };
        }])
        .controller('TableController', ['$scope', '$route', 'data',
                function($scope, $route, data) {

            $scope.data.products = data;

            $scope.refreshProducts = function() {
                $route.reload();
            }
        }]);
})();