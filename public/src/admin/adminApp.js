/**
 * Created by Bill on 14-8-8.
 */

var app = angular.module('adminApp', ['angularFileUpload']);

app.run(function($http)
{
    $http.defaults.headers.post.auth = 'HNoHW7HUKEYxW5DFxaVj';
});

app.controller('imageUploadController', function($scope, $upload)
{
    $scope.onFileSelect = function($files)
    {
        var file = $files[0];

        $scope.upload = $upload.upload({
            url: '/api/images',
            file: file
        }).success(function(data, status, headers, config)
        {
            $scope.imageName = data;
        });
    };
});