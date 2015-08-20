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
            // Game Admin Route
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
            // Gourmet Admin Route
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
            })
            // Hearth Stone Admin Route
            .state('hearthStoneSeasons', {
                url: '/admin/hearth-stone/seasons',
                templateUrl: '/views/admin/hearthStone/seasons.html',
                controller: 'hearthStoneSeasons',
                title: 'Hearth Stone Seasons'
            })
            .state('hearthStoneSeason', {
                url: '/admin/hearth-stone/season',
                templateUrl: '/views/admin/hearthStone/season.html',
                controller: 'hearthStoneSeason',
                title: 'Hearth Stone Season'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });