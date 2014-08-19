(function() {
    'use strict';

    angular.module('sportsStore')
        // .constant('productsUrl', 'http://localhost:9001/clientapp/mock/products.json')
        .constant('productsUrl', 'http://localhost:9001/backendapp/products')
        .constant('orderUrl', 'http://localhost:9001/backendapp/orders')
        .controller('SportsStoreController', ['$http', 'productsUrl', 'orderUrl', 'cart', '$location',
                function($http, productsUrl, orderUrl, cart, $location) {
            // this.products = [
            //     {name: 'Product #1',description: 'Description for Product #1',category: "Category #1",price: 100},
            //     {name: 'Product #2',description: 'Description for Product #2',category: "Category #1",price: 110},
            //     {name: 'Product #3',description: 'Description for Product #3',category: "Category #2",price: 210},
            //     {name: 'Product #4',description: 'Description for Product #4',category: "Category #3",price: 102}
            // ];


            // function randomError() {
            //     if (Math.random() < 0.5) {
            //         productsUrl = 'http://localhost:5000/unexistent';
            //         console.log(productsUrl);
            //     }
            // }
            
            this.products = [];
            this.order = {};
            var store = this;

            // randomError();

            $http.get(productsUrl)
                .success(function(products) {
                    store.products = products;
                })
                .error(function(data, status) {
                    store.error = buildCommunicationError(data, status);
                });

            this.sendOrder = function(shippingDetails) {
                var order = angular.copy(shippingDetails);
                order.products = cart.getItems();
                $http.post(orderUrl, order)
                    .success(function (data) {
                        store.order.orderId = data.id;
                        cart.getItems().length = 0;
                    })
                    .error(function (data, status) {
                        store.order.error = buildCommunicationError(data, status);
                    })
                    .finally(function () {
                        $location.path('/complete');
                    });
            };

            function buildCommunicationError(data, status) {
                var commError = {};
                if (!status) {
                    commError.error = 'unknown';
                    commError.message = 'unknown error';
                    commError.status = 'n/a';
                } else {
                    commError.error = data.error;
                    commError.message = data.message;
                    commError.status = status;
                }
                console.log('Communication Error: ' + angular.toJson(commError));
                return commError;
            }
        }]);
})();
