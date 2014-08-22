/*jshint unused: false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('promiseWorker', ['$q', function($q) {
            var deferred = $q.defer();
            return {
                link: function(scope, elem, attrs) {
                    elem.find('button').on('click', function(event) {
                        var buttonText = event.target.innerText;
                        if (buttonText === 'Abort') {
                            deferred.reject('Aborted');
                        } else {
                            deferred.resolve(buttonText);
                        }
                    });
                },
                controller: function($scope, $element, $attrs) {
                    this.promise = deferred.promise;
                },
                restrict: 'A'
            };
        }])
        .directive('promiseObserver', [function() {
            return {
                require: '^promiseWorker',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.promise.then(function(result) {
                        return 'Success (' + result + ')';
                    }, function(reason) {
                        element.text('Failed (' + reason + ')');
                    }).then(function(result) {
                        element.text(result);
                    });
                }
            };
        }]);
})();