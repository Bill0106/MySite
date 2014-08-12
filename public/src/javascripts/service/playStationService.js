/**
 * Created by Bill on 14-8-12.
 */

var playStationService = angular.module('playStationService', []);

playStationService.factory('Games', function($http)
{
    return {
        get: function()
        {
            return $http.get('/api/games');
        }
    };
});