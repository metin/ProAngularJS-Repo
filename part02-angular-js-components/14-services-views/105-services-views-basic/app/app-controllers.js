(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$resource', 'baseUrl', '$location',
                function($scope, $resource, baseUrl, $location) {

            $scope.currentProduct = null;

            $scope.productsResource = $resource(baseUrl + ':id', {id: '@id'}, {
                create: {method: 'POST'},
                save: {method: 'PUT'}
            });

            $scope.listProducts = function() {
                $scope.products = $scope.productsResource.query();
            };

            $scope.deleteProduct = function(product) {
                product.$delete().then(function() {
                    $scope.products.splice($scope.products.indexOf(product), 1);
                });
                $location.path('/list');
            };

            $scope.createProduct = function(product) {
                new $scope.productsResource(product).$create().then(function(newProduct) {
                    $scope.products.push(newProduct);
                    $location.path('/list');
                });
            };

            $scope.updateProduct = function(product) {
                product.$save();
                $location.path('/list');
            };

            $scope.editProduct = function(product) {
                $scope.currentProduct = product;
                $location.path('/edit');
            };

            $scope.saveEdit = function(product) {
                if (angular.isDefined(product.id)) {
                    $scope.updateProduct(product);
                } else {
                    $scope.createProduct(product);
                }
                $scope.currentProduct = {};
            };

            $scope.cancelEdit = function() {
                if ($scope.currentProduct && $scope.currentProduct.$get) {
                    $scope.currentProduct.$get();
                }
                $scope.currentProduct = {};
                $location.path('/list');
            };

            $scope.listProducts();
        }]);
})();