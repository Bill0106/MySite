/**
 * Created by bill on 15/8/6.
 */

var gameController = angular.module('gameController', []);

gameController.controller('gameController', function($scope, $stateParams,  Game, GAME_PLATFORMS, GAME_GENRES)
{
    $scope.game = new Game();
    if ($stateParams.url != 'add') {
        Game.get({ game_url: $stateParams.url }, function(data)
        {
            $scope.game = data;
        });
    }

    $scope.convertToInt = function(id){
        return parseInt(id, 10);
    };

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
            }
        });
    };
});