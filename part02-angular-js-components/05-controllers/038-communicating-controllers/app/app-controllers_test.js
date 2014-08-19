/* global beforeEach, describe, expect, inject, it, module */

describe('exampleApp.Controllers', function() {
    'use strict';


    describe('#SimpleController', function() {
        var $scope, ctrl;

        beforeEach(module('exampleApp.Controllers'));
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            ctrl = $controller('SimpleController', {$scope: $scope});
        }));

        it('should be instantiable', function() {
            expect(true).toBe(true);
        });
    });
});