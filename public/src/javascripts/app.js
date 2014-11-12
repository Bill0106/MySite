/**
 * Created by Bill on 14-8-8.
 */

var imagePath = 'http://zhuhaolin.com/images/';
var myApp = angular.module('myApp',['ngRoute', 'ngAnimate', 'infinite-scroll', 'appRoutes', 'homeCtrl', 'playStationCtrl', 'playStationService', 'gameCtrl', 'gameService', 'gourmetCtrl', 'gourmetService']);

myApp.controller('headerController', function($scope, $location)
{
    $scope.isActive = function(viewLocation)
    {
        return viewLocation === $location.path();
    };
});

myApp.run(function($rootScope, $http, Game)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

    $rootScope.$on('$routeChangeSuccess', function(ev, data)
    {
        if (data.$$route && data.$$route.controller)
            $rootScope.controller = data.$$route.controller;

        if (data.$$route && data.$$route.title)
            $rootScope.title = data.$$route.title;

        if (data.params && data.params.url)
            Game.get(data.params.url).success(function(obj)
            {
                $rootScope.title = obj.name + '_PlayStation Game';
            });
    });
});
