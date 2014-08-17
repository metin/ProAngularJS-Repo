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
                if ($scope.asList) {
                    return 'components/list/list.html';
                } else {
                    return 'components/table/table.html';
                }
            };
        }]);
})();