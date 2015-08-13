/**
 * Created by bill on 15/8/13.
 */

var gourmetsService = angular.module('gourmetsService', []);

gamesService.factory('Gourmet', function($resource)
{
    return $resource('/api/gourmets/:id');
});