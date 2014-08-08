(function() {
    angular.module('sportsStoreAdmin')
        .constant('ordersUrl', 'http://localhost:9001/backendapp/orders')
        .controller('OrdersController', ['$http', 'ordersUrl', function($http, ordersUrl) {
            var self = this;
            $http.get(ordersUrl)
                .success(function (data) {
                    self.orders = data;
                })
                .error(function (data, status) {
                    self.error = buildCommunicationError(data, status);
                });

            this.selectedOrder = null;

            this.selectOrder = function(order) {
                this.selectedOrder = order;
            };

            this.getTotal = function(order) {
                var total = 0;
                order.products.forEach(function (product) {
                    total += (product.count * product.price);
                });
                return total;
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