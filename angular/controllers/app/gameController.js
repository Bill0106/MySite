/**
 * Created by bill on 15/8/13.
 */

var gameController = angular.module('gameController', []);

gameController.controller('gameController', function($scope, $rootScope, $state, Game, GAME_PLATFORMS, GAME_GENRES)
{
    Game.get({ url: $state.params.url }, function(data)
    {
        $rootScope.title = data.name + '_My Games';
        $scope.game = data;
    });

    $scope.platforms = GAME_PLATFORMS;
    $scope.genres = GAME_GENRES;

    $scope.rateText = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];

    $scope.getParagraph = function(text)
    {
        if (text) {
            return text.split('\n');
        }
    };
});