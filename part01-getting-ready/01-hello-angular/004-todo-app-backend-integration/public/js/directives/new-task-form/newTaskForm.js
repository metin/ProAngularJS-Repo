(function() {
  "use strict";
  var taskFormModule = angular.module("todoAppTaskFormModule", []);

  taskFormModule.directive("newTaskForm", function() {
    return {
      restrict: "E",
      templateUrl: "/js/directives/new-task-form/new-task-form.html"
    };
  });
})();
