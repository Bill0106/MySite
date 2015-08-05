/**
 * Created by bill on 15/8/3.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game)
{
    Game.query(function(data)
    {
        $scope.games = data;

        $scope.images = [];
        angular.forEach(data, function(value)
        {
            $scope.images.push(value.image);
        });
    });

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };
});