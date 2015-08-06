/**
 * Created by bill on 15/8/6.
 */

var myAdmin = angular.module('myAdmin', [
    'ui.router', 'ngResource', 'adminRoutes',
    'gamesController', 'gameController',
    'gamesService'
]);

myAdmin.run(function($rootScope, $state, $http)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';
    $http.defaults.headers.post.auth = 'HNoHW7HUKEYxW5DFxaVj';

    $rootScope.imagePath = 'http://zhuhaolin.com/images/';
    $rootScope.$on('$stateChangeSuccess', function()
    {
        $rootScope.title = $state.current.title;
    });
});