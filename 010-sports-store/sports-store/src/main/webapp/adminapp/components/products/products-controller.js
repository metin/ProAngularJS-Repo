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

            var origProduct = {};

            var self = this;

            this.listProducts = function() {
                this.products = this.productsResource.query();
            };

            this.deleteProduct = function(product) {
                product.$delete().then(function() {
                    self.products.splice(self.products.indexOf(product), 1);    
                });                
            };

            this.createProduct = function(product) {
                new this.productsResource(product).$save().then(function (newProduct) {
                    self.products.push(newProduct);
                    self.editedProduct = {};
                });
            };

            this.updateProduct = function(product) {
                product.$save().then(function (updatedProduct) {
                    origProduct.name = updatedProduct.name;
                    origProduct.description = updatedProduct.description;
                    origProduct.price = updatedProduct.price;
                    origProduct.category = updatedProduct.category;
                    self.editedProduct = {};
                });
            };

            this.startEdit = function(product) {
                origProduct = product;
                this.editedProduct = angular.copy(product);
            };

            this.cancelEdit = function() {
                this.editedProduct = {};
            };

            this.listProducts();
        }]);
})();