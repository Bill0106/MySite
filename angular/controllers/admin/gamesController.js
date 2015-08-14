/**
 * Created by bill on 15/8/6.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game, Count, GAME_PLATFORMS, GAME_GENRES)
{
    Count.get({ model: 'games' }, function(count)
    {
        $scope.games = Game.query({ limit: count.count });
    });

    $scope.platforms = GAME_PLATFORMS;
    $scope.genres = GAME_GENRES;
});