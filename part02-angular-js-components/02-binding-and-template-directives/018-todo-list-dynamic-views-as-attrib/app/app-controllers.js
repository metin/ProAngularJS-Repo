(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {
            $scope.todos = [
                {action: 'Get groceries', complete: false},
                {action: 'Call plumber', complete: false},
                {action: 'Buy running shoes', complete: true},
                {action: 'Buy flowers', complete: false},
                {action: 'Call family', complete: false}
            ];

            $scope.showView = function() {
                return $scope.asList ? 'components/list/list.html' : 'components/table/table.html';
            };

            $scope.reportChange = function() {
                console.log('Displayed content: ' + $scope.showView());
            };
        }]);
})();