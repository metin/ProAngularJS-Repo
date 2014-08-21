/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$http', '$log', function($scope, $http, $log) {
            $scope.loadData = function() {
                $http.get('productData.json')
                    .success(function(data) {
                        $scope.products = data;
                    });
            };

            $scope.sendData = function() {
                var config = {
                    headers: {
                        'content-type': 'application/xml'
                    },
                    transformRequest: function(data, headers) {
                        var rootElem = angular.element('<xml>');
                        for (var i = 0; i < data.length; i++) {
                            var prodElem = angular.element('<product>');
                            prodElem.attr('name', data[i].name);
                            prodElem.attr('category', data[i].category);
                            prodElem.attr('price', data[i].price);
                            rootElem.append(prodElem);
                        }
                        rootElem.children().wrap('<products>');
                        return rootElem.html();
                    }
                };
                $http.post('ajax.html', $scope.products, config)
                    .error(function(data, status, headers) {
                        $log.error('The POST request has failed');
                        $log.error('--> status: ' + status);
                        $log.error('--> data: ' + data);
                    });
            };
        }]);
})();