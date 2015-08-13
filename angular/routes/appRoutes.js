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
            .state('gourmets', {
                url: '/gourmets',
                templateUrl: '/views/app/gourmets.html',
                controller: 'gourmetsController',
                title: 'My Gourmets Tour'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });