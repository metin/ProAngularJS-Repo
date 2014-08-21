(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', function($scope, $http) {
            $scope.loadData = function() {
                $http.get('productData.xml')
                    .success(function(data) {
                        $scope.products = [];
                        var productElems = angular.element(data.trim()).find('product');
                        for (var i = 0; i < productElems.length; i++) {
                            var product = productElems.eq(i);
                            $scope.products.push({
                                name: product.attr('name'),
                                category: product.attr('category'),
                                price: product.attr('price')});
                        }
                    });
            };
        }]);
})();