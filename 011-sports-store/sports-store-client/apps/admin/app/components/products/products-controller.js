(function () {
    'use strict';

    angular.module('sportsStoreAdmin')
        .constant('productsUrl', 'http://localhost:9001/backendapp/products/')
        .controller('ProductsController', ['$resource', 'productsUrl', function($resource, productsUrl) {
            
            // this.products = [
            //     {id: 1, name: 'product-name-1', description: 'description-1', category: 'category-1', price: 1.11},
            //     {id: 2, name: 'product-name-2', description: 'description-2', category: 'category-2', price: 2.22}];

            this.productsResource = $resource(productsUrl + ':id', {id: '@id'});

            this.products = {};

            this.editedProduct = {};

            this.error = {};

            var origProduct = {};

            var self = this;

            this.listProducts = function() {
                this.error = null;
                this.products = this.productsResource.query();
            };

            this.deleteProduct = function(product) {
                this.error = null;
                product.$delete().then(function() {
                    self.products.splice(self.products.indexOf(product), 1);    
                }, function(errorInfo) {
                    self.error = buildCommunicationError(errorInfo);
                });                
            };

            this.createProduct = function(product) {
                this.error = null;
                new this.productsResource(product).$save().then(function (newProduct) {
                    self.products.push(newProduct);
                    self.editedProduct = {};
                }, function(errorInfo) {
                    self.error = buildCommunicationError(errorInfo);
                });
            };

            this.updateProduct = function(product) {
                this.error = null;
                product.$save().then(function (updatedProduct) {
                    origProduct.name = updatedProduct.name;
                    origProduct.description = updatedProduct.description;
                    origProduct.price = updatedProduct.price;
                    origProduct.category = updatedProduct.category;
                    self.editedProduct = {};
                }, function(errorInfo) {
                    self.error = buildCommunicationError(errorInfo);
                });
            };

            this.startEdit = function(product) {
                this.error = null;
                origProduct = product;
                this.editedProduct = angular.copy(product);
            };

            this.cancelEdit = function() {
                this.error = null;
                this.editedProduct = {};
            };

            this.listProducts();

            function buildCommunicationError(errorInfo) {
                var commError = {};
                if (!errorInfo.status) {
                    commError.error = 'unknown';
                    commError.message = 'unknown error';
                    commError.status = 'n/a';
                } else {
                    commError.error = errorInfo.data.error;
                    commError.message = errorInfo.data.message;
                    commError.status = errorInfo.status;
                }
                console.log('Communication Error: ' + angular.toJson(commError));
                return commError;
            }
        }]);
})();