/**
 * Created by bill on 15/8/6.
 */

angular.module('gamesAdmin', ['gamesService'])
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
    .controller('gameUpdateController', function($scope, $filter, $state, $stateParams, Game, GAME_PLATFORMS, GAME_GENRES)
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
            $scope.game = Game.get({ game_url: $stateParams.url });

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
    });