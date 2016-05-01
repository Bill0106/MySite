/**
 * Created by bill on 15/8/6.
 */

angular.module('myAdmin', [
    'ui.router', 'ngFileUpload', 'adminRoutes',
    'gamesAdmin', 'gourmetsAdmin', 'hearthStoneAdmin', 'saibanAdmin',
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
    .filter('capitalize', function()
    {
        return function (str)
        {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
    });