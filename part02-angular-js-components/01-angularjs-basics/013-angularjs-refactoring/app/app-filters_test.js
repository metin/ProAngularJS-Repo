/* global beforeEach, describe, expect, inject, it, module */

describe('exampleApp.Filters', function() {
    'use strict';

    describe('#dayName', function() {
        var filter;

        beforeEach(module('exampleApp.Filters'));
        beforeEach(inject(function($filter) {
            filter = $filter('dayName');
        }));

        it('should be instantiable', function() {
            expect(true).toBe(true);
        });
    });
});