(function() {
    var app = angular.module('toDoApp-header', []);

    app.directive('tasksHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'tasks-header.html'
        };
    });
})();