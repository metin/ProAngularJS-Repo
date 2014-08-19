(function(){
    'use strict';

    angular.module('cart')
        .factory('cart', [function() {  // this defines the cart service
            var cartItems = [];

            return {
                addItem: function(id, name, price) {
                    var addedToExistingItem = false;
                    for (var i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].id === id) {
                            cartItems[i].count++;
                            addedToExistingItem = true;
                            break;
                        }
                    }
                    if (!addedToExistingItem) {
                        cartItems.push({count: 1, id: id, price: price, name: name});
                    }
                },
                removeItem: function(id) {
                    for (var i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].id === id) {
                            cartItems.splice(i, 1);
                            break;
                        }
                    }
                },
                getItems: function() {
                    return cartItems;
                }    
            };
        }]);
})();