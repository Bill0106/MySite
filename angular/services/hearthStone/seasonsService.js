/**
 * Created by bill on 15/8/19.
 */

var hearthStoneSeasonsService = angular.module('hearthStoneSeasonsService', []);

hearthStoneSeasonsService.factory('HearthStoneSeason', function($resource)
{
    return $resource('/api/hearth-stone/seasons');
});