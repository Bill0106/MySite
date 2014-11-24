/**
 * Created by Bill on 14-8-8.
 */

var app = angular.module('adminApp', ['angularFileUpload']);

app.run(function($http)
{
    $http.defaults.headers.post.auth = 'HNoHW7HUKEYxW5DFxaVj';
});

app.directive('ngAdmin', function()
{
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs)
        {
            var nav = $("[data-admin='nav']");
            var target = $("[data-admin='target']");

            target.css({
                position: 'absolute',
                top: '0',
                width: '100%'
            }).hide();

            nav.click(function(e)
            {
                e.preventDefault();

                var href = $(this).attr('href');

                nav.parent().removeClass('active');
                $(this).parent().addClass('active');
                target.hide();
                $("[data-href='" + href + "']").show();
            });
        }
    }
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
    $scope.fields = ['food', 'restaurant', 'date', 'image', 'url'];

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

app.controller('ManutdPlayerProfile', function($scope, $http)
{
    $scope.formData = {};
    $scope.fields = ['name', 'full_name', 'birthday', 'nationality', 'height', 'number', 'value', 'joined', 'image', 'stats_url'];
    $scope.positions = [
        {name: 'Goalkeeper'},
        {name: 'Centre Back'},
        {name: 'Left-Back'},
        {name: 'Right-Back'},
        {name: 'Defensive Midfield'},
        {name: 'Central Midfield'},
        {name: 'Attacking Midfield'},
        {name: 'Left Wing'},
        {name: 'Right Wing'},
        {name: 'Secondary Striker'},
        {name: 'Centre Forward'}
    ];

    $scope.createPlayer = function()
    {
        $http.post('/api/manutd/player-profile', $scope.formData)
            .success(function(data)
            {
                $scope.formData = {};
                $scope.player = data;
                $scope.show = true;
            })
            .error(function(data)
            {
                console.log('Error: ' + data);
            })
    }
});