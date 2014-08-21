(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', '$window', '$document',
            function($scope, $window, $document) {
                $document.find('button').on('click', function(event) {
                    $window.alert(event.target.innerText);
                });
        }]);
})();