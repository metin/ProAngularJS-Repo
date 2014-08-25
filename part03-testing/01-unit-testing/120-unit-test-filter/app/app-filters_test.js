/* global beforeEach, describe, expect, it  */

describe('exampleApp.Filters', function() {
    'use strict';

    var filter;

    beforeEach(angular.mock.module('exampleApp'));

    beforeEach(angular.mock.inject(['$filter', function($filter) {
        filter = $filter('labelCase');
    }]));

    it('changes case', function() {
        var result = filter('test phrase');
        expect(result).toEqual('Test phrase');
    });

    it('reverses case', function() {
        var result = filter('test phrase', true);
        expect(result).toEqual('tEST PHRASE');
    });
});