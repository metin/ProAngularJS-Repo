(function() {
    'use strict';

    angular.module('sportsStoreAdmin')
        .controller('AdminMainController', [function() {
            this.screens = ['Products', 'Orders'];
            this.currentScreen = this.screens[0];

            this.setScreen = function(screenIndex) {
                this.currentScreen = this.screens[screenIndex];
            };

            this.getScreen = function() {
                return this.currentScreen === 'Products' ? 'components/products/adminProducts.html' : 'components/orders/adminOrders.html';
            };
        }]);

})();