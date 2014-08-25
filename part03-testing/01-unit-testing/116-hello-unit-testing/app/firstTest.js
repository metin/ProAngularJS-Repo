/*global describe, beforeEach, it, expect */

/*
    Verifies that Karma and Jasmine are correctly set up
*/

describe('First Test', function() {
    'use strict';

    // Step 1: Arrange - Set up an scenario
    var counter;

    beforeEach(function() {
        counter = 0;
    });

    it('should increment value', function() {
        // Step 2: Act - attemp the operation
        counter++;

        // Step 3: Assert - verify the results
        expect(counter).toEqual(1);
    });

    it('should decrement value', function() {
        // Step 2: Act - attemp the operation
        counter--;

        // Step 3: Assert - verify the results
        expect(counter).toEqual(-1);
    });


});