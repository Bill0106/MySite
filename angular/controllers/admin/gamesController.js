/**
 * Created by bill on 15/8/6.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game)
{
    $scope.games = Game.query();
});