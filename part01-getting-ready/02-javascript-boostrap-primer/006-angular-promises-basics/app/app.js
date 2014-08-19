(function() {
    'use strict';

    var app = angular.module('promisesPrimer', []);

    app.controller('DemoController', ['$http', '$scope', function($http, $scope) {
        var promise = $http.get('todo.json');    
        promise.success(function (data) {
            $scope.todos = data;
        });

        $http.get('todo.json').then(function (response) { 
            angular.forEach(response.data, function(value) {
                value.action = 'Pass 2 ' + value.action;
                $scope.todos.push(value);    
            });           
            
        }, function () {
            $scope.todos.push({action: 'error encountered while reading data from the server'});
        }).then(function() {
            $scope.todos.push({action: 'Request complete', done: true});
        });
    }]);
})();
