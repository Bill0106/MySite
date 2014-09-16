/**
 * Created by Bill on 14-9-7.
 */

var gameService = angular.module('gameService', []);

gameService.factory('Game', function($http)
{
    return {
        get: function(game_url)
        {
            return $http.get('/api/game/' + game_url);
        }
    };
});