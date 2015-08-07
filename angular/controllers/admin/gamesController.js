/**
 * Created by bill on 15/8/6.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game, GAME_PLATFORMS, GAME_GENRES)
{
    $scope.games = Game.query();
    $scope.platforms = GAME_PLATFORMS;
    $scope.genres = GAME_GENRES;
});