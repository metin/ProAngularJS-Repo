/* global beforeEach, describe, expect, it  */

describe('exampleApp.Controllers', function() {
    'use strict';


    describe('#DefaultController', function() {
        var mockScope = {};
        var mockedBackend;
        var controller;


        beforeEach(angular.mock.module('exampleApp.Controllers'));

        beforeEach(angular.mock.inject(['$httpBackend', function($httpBackend) {
            mockedBackend = $httpBackend;
            mockedBackend.expect('GET', 'productData.json').respond(
                /*jshint quotmark: false */
                [
                    {"name": "Apples", "category": "Fruit", "price": 1.20},
                    {"name": "Bananas", "category": "Fruit", "price": 2.42},
                    {"name": "Pears", "category": "Fruit", "price": 2.02},
                ]);
                /*jshint quotmark: true */
        }]));

        beforeEach(angular.mock.inject(['$controller', '$rootScope', '$http',
                function($controller, $rootScope, $http) {
            mockScope = $rootScope.$new();
            controller = $controller('DefaultController', {
                $scope: mockScope,
                $http: $http
            });
            mockedBackend.flush();
        }]));

        it('creates variable', function() {
            expect(mockScope.counter).toEqual(0);
        });

        it('increments counter', function() {
            mockScope.incrementCounter();
            expect(mockScope.counter).toEqual(1);
        });

        it('makes Ajax request on load', function() {
            mockedBackend.verifyNoOutstandingExpectation();
        });

        it('loads data on the scope', function() {
            expect(mockScope.products).toBeDefined();
            expect(mockScope.products.length).toEqual(3);
        });

        it('preserves data ordering', function() {
            expect(mockScope.products[0].name).toEqual('Apples');
            expect(mockScope.products[1].name).toEqual('Bananas');
            expect(mockScope.products[2].name).toEqual('Pears');
        });

    });
});