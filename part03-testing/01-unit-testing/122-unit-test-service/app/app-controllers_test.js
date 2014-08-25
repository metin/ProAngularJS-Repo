/* global beforeEach, describe, expect, it  */

describe('exampleApp.Controllers', function() {
    'use strict';


    describe('#DefaultController', function() {
        var mockScope = {};
        var mockBackend;
        var mockInterval;
        var mockTimeout;
        var mockLog;
        var controller;


        beforeEach(angular.mock.module('exampleApp.Controllers'));

        beforeEach(angular.mock.inject(['$httpBackend', function($httpBackend) {
            mockBackend = $httpBackend;
            mockBackend.expect('GET', 'productData.json').respond(
                /*jshint quotmark: false */
                [
                    {"name": "Apples", "category": "Fruit", "price": 1.20},
                    {"name": "Bananas", "category": "Fruit", "price": 2.42},
                    {"name": "Pears", "category": "Fruit", "price": 2.02},
                ]);
                /*jshint quotmark: true */
        }]));

        beforeEach(angular.mock.inject(['$controller', '$rootScope', '$http', '$interval', '$timeout', '$log',
                function($controller, $rootScope, $http, $interval, $timeout, $log) {
            mockScope = $rootScope.$new();
            mockInterval = $interval;
            mockTimeout = $timeout;
            mockLog = $log;
            controller = $controller('DefaultController', {
                $scope: mockScope,
                $http: $http,
                $interval: mockInterval,
                $timeout: mockTimeout,
                $log: mockLog,
                counterService: null
            });
            mockBackend.flush();
        }]));

        it('creates variable', function() {
            expect(mockScope.counter).toEqual(0);
        });

        it('increments counter', function() {
            mockScope.incrementCounter();
            expect(mockScope.counter).toEqual(1);
        });

        it('makes Ajax request on load', function() {
            mockBackend.verifyNoOutstandingExpectation();
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

        it('limits interval to 10 updates', function() {
            for (var i = 0; i < 11; i++) {
                mockInterval.flush(5000);
            }
            expect(mockScope.intervalCounter).toEqual(10);
        });

        it('increments timer counter', function() {
            mockTimeout.flush(5000);
            expect(mockScope.timerCounter).toEqual(1);
        });

        it('writes log messages', function() {
            expect(mockLog.log.logs.length).toEqual(1);
        });
    });
});