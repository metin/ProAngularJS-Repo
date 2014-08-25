/* global beforeEach, describe, it, expect */

describe('exampleApp.Services', function() {
    'use strict';

    var service;

    beforeEach(angular.mock.module('exampleApp'));

        beforeEach(angular.mock.inject(['counterService', function(counterService) {
            service = counterService;
        }]));

    it('initializes to zero', function() {
        expect(service.getCounter()).toEqual(0);
    });

    it('increments the counter', function() {
        service.incrementCounter();
        expect(service.getCounter()).toEqual(1);
    });
});
