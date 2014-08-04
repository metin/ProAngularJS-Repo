(function() {
    'use strict';

    angular.module('sportsStore')
        .controller('SportsStoreController', [ function() {
            this.products = [
                {name: 'Product #1',description: 'Description for Product #1',category: "Category #1",price: 100},
                {name: 'Product #2',description: 'Description for Product #2',category: "Category #1",price: 110},
                {name: 'Product #3',description: 'Description for Product #3',category: "Category #2",price: 210},
                {name: 'Product #4',description: 'Description for Product #4',category: "Category #3",price: 102}
            ];
        }]);

})();
