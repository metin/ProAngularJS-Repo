(function(){
    'use strict';

    angular.module('cart')
        .directive('cartSummary', ['cart', function(cart){

                return {
                    restrict: 'E',
                    templateUrl: 'components/cart/cartSummary.html',
                    controller: function() {
                        var cartItems = cart.getItems();
                        
                        this.getTotal = function() {
                            var result = 0;
                            for (var i = 0; i < cartItems.length; i++) {
                                result += (cartItems[i].price * cartItems[i].count);
                            }
                            return result;
                        };

                        this.getItemCount = function() {
                            var result = 0;
                            for (var i = 0; i < cartItems.length; i++) {
                                result += cartItems[i].count;
                            }
                            return result;
                        };
                    },
                    controllerAs: 'cartCtrl'            
                };
            }]);
})();