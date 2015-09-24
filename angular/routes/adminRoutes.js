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
            .state('gameTrophiesScrap', {
                url: '/admin/scrap/:id',
                templateUrl: '/views/admin/games/scrap.html',
                controller: 'gameTrophiesScrapController',
                title: 'Game Trophies Scrap'
            })
            .state('gameTrophies', {
                url: '/admin/trophies/:id',
                templateUrl: '/views/admin/games/trophies.html',
                controller: 'gameTrophiesController',
                title: 'Game Trophies'
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
            })
            .state('HScardAdd', {
                url: '/admin/hearth-stone-cards/:deck_id',
                templateUrl: '/views/admin/hearthStone/cards.html',
                controller: 'hsCardAddController',
                title: 'Hearth Stone Card Add'
            })
            .state('HSseasons', {
                url: '/admin/hearth-stone-seasons',
                templateUrl: '/views/admin/hearthStone/season_list.html',
                controller: 'hsSeasonsController',
                title: 'Hearth Stone Seasons'
            })
            .state('HSSeasonCreate', {
                url: '/admin/hearth-stone-seasons/add',
                templateUrl: '/views/admin/hearthStone/season_create.html',
                controller: 'hsSeasonCreateController',
                title: 'Hearth Stone Season Create'
            })
            .state('HSSeasonUpdate', {
                url: '/admin/hearth-stone-seasons/:url',
                templateUrl: '/views/admin/hearthStone/season_create.html',
                controller: 'hsSeasonUpdateController',
                title: 'Hearth Stone Season Update'
            })
            .state('HSWins', {
                url: '/admin/hearth-stone-wins',
                templateUrl: '/views/admin/hearthStone/win_list.html',
                controller: 'hsWinsController',
                title: 'Hearth Stone Wins'
            })
            .state('HSWinCreate', {
                url: '/admin/hearth-stone-wins/add',
                templateUrl: '/views/admin/hearthStone/win_create.html',
                controller: 'hsWinCreateController',
                title: 'Hearth Stone Win Create'
            })
            .state('HSWinUpdate', {
                url: '/admin/hearth-stone-wins/:id',
                templateUrl: '/views/admin/hearthStone/win_create.html',
                controller: 'hsWinUpdateController',
                title: 'Hearth Stone Win Update'
            })
            // Gyakuten Saiban Admin Route
            .state('saibanGames', {
                url: '/admin/saiban-games',
                templateUrl: '/views/admin/saiban/game_list.html',
                controller: 'saibanGamesController',
                title: 'Gyakuten Saiban Games'
            })
            .state('saibanGameCreate', {
                url: '/admin/saiban-games/add',
                templateUrl: '/views/admin/saiban/game_create.html',
                controller: 'saibanGameCreateController',
                title: 'Gyakuten Saiban Game Create'
            })
            .state('saibanGameUpdate', {
                url: '/admin/saiban-games/:url',
                templateUrl: '/views/admin/saiban/game_create.html',
                controller: 'saibanGameUpdateController',
                title: 'Gyakuten Saiban Game Update'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });