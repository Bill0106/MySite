/**
 * Created by Bill on 14-9-10.
 */

var gameCtrl = angular.module('gameCtrl', []);

gameCtrl.controller('gameController', function($scope, $routeParams, Game)
{
    Game.get($routeParams.url).success(function(data)
    {
        console.log(data.name);
    });
});