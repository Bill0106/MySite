/**
 * Created by bill on 15/8/3.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game)
{
    Game.query(function(data)
    {
        $scope.games = data;
    });

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };

    $scope.getDate = function(timestamp)
    {
        var newDate = new Date(parseInt(timestamp));
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var day = newDate.getDate();
        var date = year + '.' + month + '.' + day;

        return date;
    };
});