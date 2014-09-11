/**
 * Created by Bill on 14-9-10.
 */

var gameCtrl = angular.module('gameCtrl', []);

gameCtrl.controller('gameController', function($scope, $routeParams, Game)
{
    Game.get($routeParams.url).success(function(data)
    {
        $scope.game = data;

        $scope.descriptions = data.description.split("\n");

        var companies = data.company.split("/");

        if (companies.length == '1') {
            $scope.developer = data.company;
            $scope.publish = data.company;
        } else {
            $scope.developer = companies[0];
            $scope.publish = companies[1];
        }
    });
});