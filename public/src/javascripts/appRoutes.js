/**
 * Created by Bill on 14-8-8.
 */

angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: '/views/index/index.html',
                controller: 'homeController',
                title: 'Home'
            })
            .when('/playstation', {
                templateUrl: '/views/playstation/playstation.html',
                controller: 'playStationController',
                title: 'PlayStation'
            })
            .when('/game/:url', {
                templateUrl: '/views/playstation/game.html',
                controller: 'gameController',
                title: 'Game'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);