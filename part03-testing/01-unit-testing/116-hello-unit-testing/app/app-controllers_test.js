/* global beforeEach, describe, expect, it  */

describe('exampleApp.Controllers', function() {
    'use strict';


    describe('#DefaultController', function() {
        var mockScope = {};
        var controller;

        beforeEach(angular.mock.module('exampleApp.Controllers'));

        beforeEach(angular.mock.inject(['$controller', '$rootScope', function($controller, $rootScope) {
            mockScope = $rootScope.$new();
            controller = $controller('DefaultController', {
                $scope: mockScope
            });
        }]));

        it('creates variable', function() {
            expect(mockScope.counter).toEqual(0);
        });

        it('increments counter', function() {
            mockScope.incrementCounter();
            expect(mockScope.counter).toEqual(1);
        });
    });
});