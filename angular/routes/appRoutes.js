/**
 * Created by bill on 15/7/30.
 */

angular.module('appRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/views/app/index.html',
                controller: 'homeController',
                title: 'Home'
            })
            .state('games', {
                url: '/games',
                templateUrl: '/views/app/games.html',
                controller: 'gamesController',
                title: 'My Games'
            })
            .state('game', {
                url: '/games/:url.html',
                templateUrl: '/views/app/game.html',
                controller: 'gameController',
                title: 'Game'
            })
            .state('gourmets', {
                url: '/gourmets',
                templateUrl: '/views/app/gourmets.html',
                controller: 'gourmetsController',
                title: 'My Gourmets Tour'
            })
            .state('hsSeasons', {
                url: '/hearth-stone/seasons',
                templateUrl: '/views/app/hearth-stone/seasons.html',
                controller: 'hsSeasonsController',
                title: 'My HearthStone Seasons'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });