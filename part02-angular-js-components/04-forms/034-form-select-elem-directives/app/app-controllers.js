(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.todos = [
                {id: 100, place: 'Store', action: 'Get groceries', complete: false},
                {id: 200, place: 'Home', action: 'Call plumber', complete: false},
                {id: 300, place: 'Store',action: 'Buy running shoes', complete: true}
            ];

        }]);
})();