(function() {
    'use strict';

    angular.module('exampleApp.Services', [])
        .service('zipCodes', ['$rootScope', function($rootScope) {
            return {
                setZipCode : function(type, zip) {
                    this[type] = zip;
                    $rootScope.$broadcast('zipCodeUpdated', {type: type, zipCode: zip});
                }
            };
        }]);
})();