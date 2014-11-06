/**
 * Created by Bill on 14-8-8.
 */

var imagePath = 'http://zhuhaolin.com/images/';
var myApp = angular.module('myApp',['ngRoute', 'ngAnimate', 'infinite-scroll', 'appRoutes', 'homeCtrl', 'homeService', 'playStationCtrl', 'playStationService', 'gameCtrl', 'gameService']);

myApp.controller('titleController', function($scope, $route, Game)
{
    $scope.$on('$routeChangeSuccess', function()
    {
        if ($route.current.title == 'Game') {
            Game.get($route.current.params.url).success(function(data)
            {
                $scope.title = data.name + '_PlayStation Game';
            });
        } else {
            $scope.title = $route.current.title;
        }
    });
});

myApp.controller('headerController', function($scope, $location)
{
    $scope.isActive = function(viewLocation)
    {
        return viewLocation === $location.path();
    };
});

myApp.run(function($http)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';
});
