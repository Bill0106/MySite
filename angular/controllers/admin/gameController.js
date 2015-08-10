/**
 * Created by bill on 15/8/6.
 */

var gameController = angular.module('gameController', []);

gameController.controller('gameController', function($scope, $filter, $state, $stateParams,  Game, GAME_PLATFORMS, GAME_GENRES)
{
    $scope.game = new Game();
    if ($stateParams.url != 'add') {
        Game.get({ game_url: $stateParams.url }, function(data)
        {
            $scope.game = data;
        });
    }

    $scope.$watch('game.release_at', function(newValue)
    {
        $scope.game.release_at = $filter('date')(newValue, 'yyyy-MM-dd');
    });
    $scope.$watch('game.buy_at', function(newValue)
    {
        $scope.game.buy_at = $filter('date')(newValue, 'yyyy-MM-dd');
    });

    $scope.fields = ['title', 'name', 'developer', 'publisher', 'release_at', 'buy_at', 'rate', 'image', 'url'];
    $scope.platforms = GAME_PLATFORMS;
    $scope.genres = GAME_GENRES;

    $scope.createGame = function()
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
});