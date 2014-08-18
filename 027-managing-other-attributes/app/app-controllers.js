(function() {
    'use strict';

    angular.module('exampleApp.Controllers', [])
        .controller('DefaultController', ['$scope', function($scope) {

            $scope.images = [   'images/kimi_accident.1.jpg',
                                'images/kimi_accident.2.jpg',
                                'images/kimi_accident.3.jpg'
                            ];

            $scope.selectedImage = 0;

            $scope.getSelectedImage = function() {
                return $scope.images[$scope.selectedImage];
            };

            $scope.setSelectedImage = function(imageIndex) {
                $scope.selectedImage = imageIndex;
            };

        }]);
})();