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
        {name: 'PlayStation 3'},
        {name: 'PlayStation 4'},
        {name: 'PlayStation Vita'}
    ];
    $scope.genres = [
        {name: 'Action'},
        {name: 'Adventure'},
        {name: 'Fighting'},
        {name: 'Racing'},
        {name: 'Role-Playing'},
        {name: 'Sports'},
        {name: 'Third-person shooter'}
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

app.controller('GourmetPostController', function($scope, $http)
{
    $scope.formData = {};
    $scope.fields = ['food', 'restaurant', 'image', 'url'];

    $scope.createGourmet = function()
    {
        $http.post('/api/gourmets', $scope.formData)
            .success(function(data)
            {
                $scope.formData = {};
                $scope.gourmet = data;
                $scope.show = true;
            })
            .error(function(data)
            {
                console.log('Error: ' + data);
            })
    }
});