(function() {
    var app = angular.module('toDoApp-newTaskForm', []);

    app.directive('newTaskForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'new-task-form.html'
        };
    });
})();