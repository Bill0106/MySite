/**
 * Created by bill on 15/8/25.
 */

angular.module('hearthStoneApp', [])
    .controller('hsSeasonsController', function($scope, HSSeason)
    {
        HSSeason.query(function(data)
        {
            $scope.seasons = data;
        });
    });