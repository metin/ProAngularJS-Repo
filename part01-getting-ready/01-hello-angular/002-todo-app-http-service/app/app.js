(function() {
    'use strict';

    var model = {
        user: 'Adam'
    };

    var app = angular.module('todoApp', []);

    app.run(['$http', function($http) {
        model.items = [];
        $http.get('/mock-data/todo.json').success(function (data) {
            model.items = data;
        });
    }]);

    app.controller('ToDoController', function() {
        this.toDoInfo = model;

        this.getPendingTasks = function () {
            var result = [];
            model.items.forEach(function(item) {
                if (item.done === false) {
                    result.push(item);
                }
            });
            return result;
        };

        this.getWarningLevel = function() {
            var pendingTasksCount = this.getPendingTasks().length;
            if (pendingTasksCount < 3) {
                return 'label-success';
            } else if (pendingTasksCount === model.items.length) {
                return 'label-danger';
            } else {
                return 'label-warning';
            }
        };

        this.task = {};
        this.addNewItem = function(actionText) {
            model.items.push({action: actionText, done: false});
            this.task = {};
        };

        this.showCompleted = true;
    });

    app.filter('filterByCheckedStatus', function() {
        return function(items, showCompleted) {
            var results = [];
            angular.forEach(items, function(item){
                if (!item.done || showCompleted) {
                    results.push(item);
                }
            });
            return results;
        };
    });
})();
