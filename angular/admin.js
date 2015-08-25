/**
 * Created by bill on 15/8/6.
 */

angular.module('myAdmin', [
    'ui.router', 'ngFileUpload', 'adminRoutes',
    'gamesAdmin', 'gourmetsAdmin', 'hearthStoneAdmin',
    'myServices', 'myConfig'])
    .run(function($rootScope, $state, $http)
    {
        $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';
        $http.defaults.headers.post.auth = 'HNoHW7HUKEYxW5DFxaVj';

        $rootScope.imagePath = 'http://zhuhaolin.com/images/';
        $rootScope.$on('$stateChangeSuccess', function()
        {
            $rootScope.title = $state.current.title;
        });
    })
    .controller('imageUploadController',['$scope', 'Upload', function($scope, Upload)
    {
        $scope.$watch('file', function(file)
        {
            if (file) {
                $scope.upload($scope.file);
            }
        });

        $scope.upload = function(file)
        {
            Upload.upload({
                url: '/api/images',
                file: file
            }).progress(function (evt) {
                $scope.uploading = true;
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
                $scope.progress = 0;
                $scope.success = true;
                $scope.imageName = data;
            }).error(function (data, status, headers, config) {
                $scope.fail = true;
                $scope.msg = data;
            });
        };
    }]);