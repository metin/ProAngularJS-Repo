/* global beforeEach, describe, expect, inject, it, module */

describe('exampleApp Controllers', function() {
    'use strict';


    describe('#TodayController', function() {
        var $scope, ctrl;

        beforeEach(module('exampleApp'));
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            ctrl = $controller('TodayController', {$scope: $scope});
        }));

        it('should be instantiable', function() {
            expect(true).toBe(true);
        });
    });

    describe('#TomorrowController', function() {
        var $scope, ctrl;

        beforeEach(module('exampleApp'));
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            ctrl = $controller('TomorrowController', {$scope: $scope});
        }));

        it('should be instantiable', function() {
            expect(true).toBe(true);
        });
    });
});