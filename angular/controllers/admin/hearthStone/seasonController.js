/**
 * Created by bill on 15/8/19.
 */

var hearthStoneSeason = angular.module('hearthStoneSeasonController', ['hearthStoneSeasonsService']);

hearthStoneSeason.controller('hearthStoneSeason', function($scope, $state, $stateParams, HearthStoneSeason)
{
    $scope.season = new HearthStoneSeason();

    $scope.createSeason = function()
    {
        $scope.season.$save(function(data)
        {
            if (!data.success) {
                $scope.show = true;
                $scope.result = data.msg;
            } else {
                $state.go('hearthStoneSeasons');
            }
        });
    };
});