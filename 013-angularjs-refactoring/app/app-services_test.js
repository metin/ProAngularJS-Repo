/* global beforeEach, describe, expect, inject, it, module */

describe('exampleApp.Services', function() {
    'use strict';

    describe('#daysService', function() {

        var daysService;

        beforeEach(module('exampleApp.Services'));
        beforeEach(inject(function(_daysService_) {
            daysService = _daysService_;
        }));

        describe('#daysService', function() {
            it('should be instantiable', function() {
                expect(true).toBe(true);
            });
        });
    });

});
