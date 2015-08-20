/**
 * Created by bill on 15/8/3.
 */

var gamesService = angular.module('gamesService', []);

gamesService.factory('Game', function($resource)
{
    return $resource('/api/games/:game_url', { game_url: '@url'}, {
        update: {
            method: 'POST'
        }
    });
});