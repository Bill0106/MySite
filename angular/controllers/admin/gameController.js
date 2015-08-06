/**
 * Created by bill on 15/8/6.
 */

var gameController = angular.module('gameController', []);

gameController.controller('gameController', function($scope, $stateParams,  Game)
{
    $scope.game = Game.get({ game_url: $stateParams.url });

    $scope.fields = ['title', 'name', 'company', 'date', 'rate', 'image', 'url'];

    $scope.platforms = [
        {
            value: 0,
            name: 'PlayStation 3'
        },
        {
            value: 1,
            name: 'PlayStation Vita'
        },
        {
            value: 2,
            name: 'PlayStation 4'
        }
    ];

    $scope.genres = [
        {
            value: 0,
            name: 'Action'
        },
        {
            value: 1,
            name: 'Adventure'
        },
        {
            value: 2,
            name: 'Fighting'
        },
        {
            value: 3,
            name: 'Racing'
        },
        {
            value: 4,
            name: 'Role-Playing'
        },
        {
            value: 5,
            name: 'Sports'
        },
        {
            value: 6,
            name: 'Third-person shooter'
        }
    ];

});