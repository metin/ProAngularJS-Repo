/*jshint unused: false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('promiseWorker', ['$q', function($q) {
            var deferred = [$q.defer(), $q.defer()];
            var promises = [deferred[0].promise, deferred[1].promise];
            return {
                link: function(scope, elem, attrs) {
                    elem.find('button').on('click', function(event) {
                        var buttonText = event.target.innerText;
                        var buttonGroup = event.target.getAttribute('data-group');
                        if (buttonText === 'Abort') {
                            deferred[buttonGroup].reject('Aborted');
                        } else {
                            deferred[buttonGroup].resolve(buttonText);
                        }
                    });
                },
                controller: function($scope, $element, $attrs) {
                    this.promise = $q.all(promises).then(function(results) {
                        return results.join(); // concatenate the results
                    });
                },
                restrict: 'A'
            };
        }])
        .directive('promiseObserver', [function() {
            return {
                require: '^promiseWorker',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.promise.then(function(result) {
                        return element.text('Success (' + result + ')');
                    }, function(reason) {
                        element.text('Failed (' + reason + ')');
                    });
                }
            };
        }]);
})();