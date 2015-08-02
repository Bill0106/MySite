/**
 * Created by bill on 15/7/30.
 */

var myApp = angular.module('myApp',['ui.router', 'appRoutes', 'homeController']);

myApp.run(function($rootScope, $state, $http)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

    $rootScope.imagePath = 'http://zhuhaolin.com/images/';
    $rootScope.$on('$stateChangeSuccess', function()
    {
        $rootScope.bodyClass = $state.current.controller;
        $rootScope.title = $state.current.title;
    });
});