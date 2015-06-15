/**
 * Created by Bill on 14-8-12.
 */


var playStationCtrl = angular.module('playStationCtrl', []);

playStationCtrl.controller('playStationController', function($scope, Games)
{
    $scope.imagePath = imagePath;
    $scope.busy = true;

    Games.get().success(function(data)
    {
        getLazyLoadingData($scope, data);
    });

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };
});