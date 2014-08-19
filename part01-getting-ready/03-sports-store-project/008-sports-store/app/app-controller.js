(function() {
    'use strict';

    angular.module('sportsStore')
        .constant('productsUrl', 'http://localhost:5000/app-backend/mocked-data/products.json')
        .controller('SportsStoreController', ['$http', 'productsUrl', function($http, productsUrl) {
            // this.products = [
            //     {name: 'Product #1',description: 'Description for Product #1',category: "Category #1",price: 100},
            //     {name: 'Product #2',description: 'Description for Product #2',category: "Category #1",price: 110},
            //     {name: 'Product #3',description: 'Description for Product #3',category: "Category #2",price: 210},
            //     {name: 'Product #4',description: 'Description for Product #4',category: "Category #3",price: 102}
            // ];


            function randomError() {
                if (Math.random() < 0.5) {
                    productsUrl = 'http://localhost:5000/unexistent';
                    console.log(productsUrl);
                }
            }
            
            this.products = [];
            var store = this;

            // randomError();

            $http.get(productsUrl)
                .success(function(products) {
                    store.products = products;
                })
                .error(function(data, status, headers, config) {
                    store.error = {message: data, status: status};
                });
        }]);
})();
