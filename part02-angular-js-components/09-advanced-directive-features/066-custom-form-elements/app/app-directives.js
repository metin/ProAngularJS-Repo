/*jshint unused:false */
(function() {
    'use strict';

    angular.module('exampleApp.Directives', [])
        .directive('triButton', function() {
            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                templateUrl: 'triTemplate.html',
                link: function(scope, element, attrs, ctrl) {
                    var setSelected = function(value) {
                        var buttons = element.find('button');
                        buttons.removeClass('btn-primary');
                        for (var i = 0; i < buttons.length; i++) {
                            if (buttons.eq(i).text() === value) {
                                buttons.eq(i).addClass('btn-primary');
                            }
                        }
                    };
                    ctrl.$render = function() {
                        setSelected(ctrl.$viewValue || 'Not Sure');
                    };

                    element.on('click', function(event) {
                        setSelected(event.target.innerText);
                        scope.$apply(function() {
                            ctrl.$setViewValue(event.target.innerText);
                        });
                    });

                    ctrl.$formatters.push(function(value) {
                        return value === 'Huh?' ? 'Not Sure' : value;
                    });

                    var validateParser = function(value) {
                        var valid = (value === 'Yes' || value === 'No');
                        ctrl.$setValidity('confidence', valid);
                        return valid ? value : undefined;
                    };

                    ctrl.$parsers.push(validateParser);
                }
            };
        });
})();