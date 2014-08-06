(function() {
    'use strict';

    var app = angular.module('sportsStore', ['cart', 'ngRoute']);

    app.config(['$routeProvider',function($routeProvider) {
        $routeProvider.when('/checkout', {templateUrl: 'components/checkout/checkoutSummary.html'});
        $routeProvider.when('/products', {templateUrl: 'components/product-catalog/productCatalog.html'});
        $routeProvider.when('/complete', {templateUrl: 'components/checkout/thankYou.html'});
        $routeProvider.when('/placeorder', {templateUrl: 'components/checkout/placeOrder.html'});
        $routeProvider.otherwise({templateUrl: 'components/product-catalog/productCatalog.html'});
    }]);
})();
