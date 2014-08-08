/**
 * Created by Bill on 14-8-8.
 */

var homeService = angular.module('homeService', []);

homeService.factory('homeLinks', function($http)
{
    return {
        get: function()
        {
            return $http.get('/api/homelinks');
        }
    };
});