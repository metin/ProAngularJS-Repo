(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', function($scope, $http) {
            $scope.loadData = function() {
                var config = {
                    transformResponse: function(data, headers) {
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
                    }
                };

                $http.get('productData.xml', config)
                    .success(function(data) {
                        $scope.products = data;
                    });
            };
        }]);
})();