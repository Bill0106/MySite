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

app.controller('GamePostController', function($scope, $http)
{
    $scope.formData = {};
    $scope.fields = ['title', 'name', 'company', 'date', 'rate', 'image'];
    $scope.platforms = [
        {name: 'PlatStation 3'},
        {name: 'PlatStation 4'},
        {name: 'PlatStation Vita'}
    ];

    $scope.createGame = function()
    {
        $http.post('/api/games', $scope.formData)
            .success(function(data)
            {
                $scope.formData = {};
                $scope.game = data;
                $scope.show = true;
            })
            .error(function(data)
            {
                console.log('Error: ' + data);
            });
    };
});