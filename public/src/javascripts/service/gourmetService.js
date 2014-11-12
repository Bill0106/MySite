/**
 * Created by Bill on 14-11-11.
 */

var gourmetService = angular.module('gourmetService', []);

gourmetService.factory('Gourmets', function($http)
{
    return {
        get: function()
        {
            return $http.get('/api/gourmets');
        }
    };
});