/**
 * Created by Bill on 14-8-8.
 */

var imagePath = 'http://zhuhaolin.com/images/';
var myApp = angular.module('myApp',['ui.router', 'ngAnimate', 'infinite-scroll', 'appRoutes', 'homeCtrl', 'playStationCtrl', 'playStationService', 'gameCtrl', 'gameService', 'gourmetCtrl', 'gourmetService']);

myApp.run(function($rootScope, $state, $http, Game)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams)
    {
        $rootScope.bodyClass = $state.current.controller;

        if (toState.name == 'game') {
            Game.get(toParams.url).success(function(data)
            {
                $rootScope.title = data.name + '_PlayStation';
            });
        } else {
            $rootScope.title = $state.current.title;
        }
    });
});
