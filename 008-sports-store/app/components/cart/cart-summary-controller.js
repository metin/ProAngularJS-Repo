(function() {
    angular.module('cart')
        .controller('CartSummaryController', ['cart', function(cart) {
            this.items = cart.getItems();

            this.getTotal = function() {
                var result = 0;
                this.items.forEach(function(item){
                    result += item.price * item.count;
                });
                return result;
            };

            this.removeItem = function(id) {
                cart.removeItem(id);
            };

        }]);
})();