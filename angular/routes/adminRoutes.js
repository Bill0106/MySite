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
                templateUrl: '/views/admin/games/list.html',
                controller: 'gamesController',
                title: 'Games'
            })
            .state('gameCreate', {
                url: '/admin/games/add',
                templateUrl: '/views/admin/games/create.html',
                controller: 'gameCreateController',
                title: 'Game Create'
            })
            .state('gameUpdate', {
                url: '/admin/games/:url',
                templateUrl: '/views/admin/games/create.html',
                controller: 'gameUpdateController',
                title: 'Game Update'
            })
            // Gourmet Admin Route
            .state('gourmets', {
                url: '/admin/gourmets',
                templateUrl: '/views/admin/gourmets/list.html',
                controller: 'gourmetsController',
                title: 'Gourmets'
            })
            .state('gourmetCreate', {
                url: '/admin/gourmets/add',
                templateUrl: '/views/admin/gourmets/create.html',
                controller: 'gourmetCreateController',
                title: 'Gourmet Create'
            })
            .state('gourmetUpdate', {
                url: '/admin/gourmets/:id',
                templateUrl: '/views/admin/gourmets/create.html',
                controller: 'gourmetUpdateController',
                title: 'Gourmet Update'
            })
            // Hearth Stone Admin Route
            .state('HSdecks', {
                url: '/admin/hearth-stone-decks',
                templateUrl: '/views/admin/hearthStone/deck_list.html',
                controller: 'hsDecksController',
                title: 'Hearth Stone Decks'
            })
            .state('HSdeckCreate', {
                url: '/admin/hearth-stone-decks/add',
                templateUrl: '/views/admin/hearthStone/deck_create.html',
                controller: 'hsDeckCreateController',
                title: 'Hearth Stone Deck Create'
            })
            .state('HSdeckUpdate', {
                url: '/admin/hearth-stone-decks/:id',
                templateUrl: '/views/admin/hearthStone/deck_create.html',
                controller: 'hsDeckUpdateController',
                title: 'Hearth Stone Deck Update'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });