(function(){
  "use strict";

  var model = {
    user: "Sergio"
  };

  /* the AngularJS application */
  var app = angular.module("todoApp", []);

  /* initialization tasks */
  app.run(["$http", function($http) {
    model.items = [];
    $http
      .get("/mock-data/todo-items.json")
      .success(function(data) {
        model.items = data;
      });
  }]);

  /*
    The Controller:
      + user action responses
      + glue between the model and the view
  */
  app.controller("ToDoCtrl", function() {

    /* bind the model in the `todoInfo` property */
    this.toDoInfo = model;

    /* return the list of tasks not completed */
    this.getPendingTasks = function() {
      return model.items.filter(function(item) {
        return !item.done;
      });
    };

    /* return bootstrap class `label-success` if pending tasks < 3; `label-warning` otherwise */
    this.getWarningLevelClass = function() {
      var pendingTasksCount = this.getPendingTasks().length;
      if (pendingTasksCount < 3) {
        return "label-success";
      } else {
        return "label-warning";
      }
    };

    /* placeholder for the new Task */
    this.task = {};

    /* add a new task to the model */
    this.addNewItem = function(actionText) {
      model.items.push({ action: actionText, done: false});
      this.task = {};
    };

    /* default filter value */
    this.showCompleted = true;
  });

  /*
    filterByCheckedStatus Custom filter
  */
  app.filter("filterByCheckedStatus", function() {
    return function(items, showCompleted) {
      return items.filter(function(item) {
        return !item.done || showCompleted;
      });
    };
  });

})();
