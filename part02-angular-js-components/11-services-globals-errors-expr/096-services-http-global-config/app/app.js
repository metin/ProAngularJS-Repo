(function () {
    'use strict';

    angular.module('exampleApp', ['exampleApp.Controllers'])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.transformResponse.push(function(data, headers) {
                if (headers('content-type' === 'application/xml') && angular.isString(data)) {
                    var products = [];
                    var productElems = angular.element(data.trim()).find('product');
                    for (var i = 0; i < productElems.length; i++) {
                        var product = productElems.eq(i);
                        products.push({
                            name: product.attr('name'),
                            category: product.attr('category'),
                            price: product.attr('price')});
                    }
                    return products;
                } else {
                    return data;
                }
            });
        }]);
})();