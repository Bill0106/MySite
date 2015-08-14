/**
 * Created by bill on 15/8/6.
 */

angular.module('adminRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: '/admin',
                templateUrl: '/views/admin/index.html',
                title: 'Home'
            })
            .state('games', {
                url: '/admin/games',
                templateUrl: '/views/admin/games.html',
                controller: 'gamesController',
                title: 'Games'
            })
            .state('game', {
                url: '/admin/games/:url',
                templateUrl: '/views/admin/game.html',
                controller: 'gameController',
                title: 'Game'
            })
            .state('gourmets', {
                url: '/admin/gourmets',
                templateUrl: '/views/admin/gourmets.html',
                controller: 'gourmetsController',
                title: 'Gourmets'
            })
            .state('gourmet', {
                url: '/admin/gourmets/:id',
                templateUrl: '/views/admin/gourmet.html',
                controller: 'gourmetController',
                title: 'Gourmet'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });