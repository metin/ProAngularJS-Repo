(function() {
    'use strict';

    angular.module('sportsStoreAdmin')
        .constant('loginUrl', 'http://localhost:9001/j_spring_security_check')
        .controller('LoginController', ['$http', 'loginUrl', '$location', function($http, loginUrl, $location) {

            var self = this;

            this.login = function(username, password) {
                var data ='j_username=' + username + '&j_password=' + password;
                $http.post(loginUrl, data, { headers: {"Content-Type": "application/x-www-form-urlencoded"}})
                    .success(function(data) {
                        $location.path('/main');
                    })
                    .error(function(data, status) {
                        self.error = buildCommunicationError(data, status);
                    });
            };    

        function buildCommunicationError(data, status) {
                var commError = {};
                if (!status) {
                    commError.error = 'unknown';
                    commError.message = 'unknown error';
                    commError.status = 'n/a';
                } else {
                    commError.error = data.error;
                    commError.message = data.message;
                    commError.status = status;
                }
                console.log('Communication Error: ' + angular.toJson(commError));
                return commError;
            }
        }]);
})();