/**
 * Created by bill on 15/8/6.
 */

angular.module('gamesAdmin', [])
    .controller('gamesController', function($scope, Game, Count, GAME_PLATFORMS, GAME_GENRES)
    {
        Count.get({ model: 'games' }, function(count)
        {
            $scope.count = count.count;
            $scope.games = Game.query({ limit: count.count });
        });

        $scope.platforms = GAME_PLATFORMS;
        $scope.genres = GAME_GENRES;
    })
    .controller('gameCreateController', function($scope, $state, Game, GAME_PLATFORMS, GAME_GENRES)
    {
        $scope.fields = ['title', 'name', 'developer', 'publisher', 'release_at', 'buy_at', 'rate', 'image'];
        $scope.platforms = GAME_PLATFORMS;
        $scope.genres = GAME_GENRES;

        $scope.game = new Game();
        $scope.saveGame = function()
        {
            $scope.game.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('games');
                }
            });
        };
    })
    .controller('gameUpdateController', function($scope, $filter, $state, Game, GAME_PLATFORMS, GAME_GENRES)
    {
        $scope.fields = ['title', 'name', 'developer', 'publisher', 'release_at', 'buy_at', 'rate', 'image'];
        $scope.platforms = GAME_PLATFORMS;
        $scope.genres = GAME_GENRES;

        $scope.saveGame = function()
        {
            $scope.game.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('games');
                }
            });
        };

        $scope.loadGame = function()
        {
            $scope.game = Game.get({ url: $state.params.url });

            $scope.$watch('game.release_at', function(newValue)
            {
                if (newValue) {
                    $scope.game.release_at = $filter('date')(newValue, 'yyyy-MM-dd');
                }
            });
            $scope.$watch('game.buy_at', function(newValue)
            {
                if (newValue) {
                    $scope.game.buy_at = $filter('date')(newValue, 'yyyy-MM-dd');
                }
            });
        };

        $scope.loadGame();
    })
    .controller('gameTrophiesController', function($scope, $state, $filter, GameTrophy, GAME_TROPHY_RARITY)
    {
        $scope.rarities = GAME_TROPHY_RARITY;

        GameTrophy.get({ id: $state.params.id }, function(data)
        {
            var format = [];
            angular.forEach(data.trophies, function(value)
            {
                if (value.date) {
                    value.date = $filter('date')(value.date, 'yyyy-MM-dd');
                }

                format.push(value);

                if (format.length == data.trophies.length) {
                    data.trophies = format;
                    $scope.trophies = data;
                }
            });
        });

        $scope.saveTrophies = function()
        {
            $scope.trophies.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('games');
                }
            });
        };
    })
    .controller('gameTrophiesScrapController', function($scope, $state, $http)
    {
        $scope.scrapGame = function()
        {
            $http.post('/api/games/scrap/' + $state.params.id, { url: $scope.url })
                .success(function(data)
                {
                    $state.go('gameTrophies', { id: data });
                }).
                error(function(error)
                {
                    $scope.show = true;
                    $scope.result = error;
                });
        };
    });