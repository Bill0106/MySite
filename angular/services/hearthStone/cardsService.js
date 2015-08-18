/**
 * Created by bill on 15/8/18.
 */

var cardsService = angular.module('cardsService', []);

cardsService.factory('Card', function($resource)
{
    return $resource('/api/hearth-stone/cards');
});