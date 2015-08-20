/**
 * Created by bill on 15/8/19.
 */

var hearthStoneSeasons = angular.module('hearthStoneSeasonsController', ['hearthStoneSeasonsService']);

hearthStoneSeasons.controller('hearthStoneSeasons', function($scope, HearthStoneSeason)
{
    $scope.seasons = HearthStoneSeason.query();
});