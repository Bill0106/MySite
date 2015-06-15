/**
 * Created by Bill on 14-8-8.
 */

angular.module('appRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/index.html',
                controller: 'homeController',
                title: 'Home'
            })
            .state('playstation', {
                url: '/playstation',
                templateUrl: '/views/playstation.html',
                controller: 'playStationController',
                title: 'PlayStation'
            })
            .state('game', {
                url: '/playstation/:url',
                templateUrl: '/views/game.html',
                controller: 'gameController',
                title: 'Game'
            })
            .state('gourmet', {
                url: '/gourmet',
                templateUrl: '/views/gourmet.html',
                controller: 'gourmetController',
                title: 'Gourmet'
            });

        $locationProvider.html5Mode(true);
    });