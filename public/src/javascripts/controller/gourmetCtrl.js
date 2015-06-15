/**
 * Created by Bill on 14-11-9.
 */

var gourmetCtrl = angular.module('gourmetCtrl', []);

gourmetCtrl.controller('gourmetController', function($scope, Gourmets)
{
    $scope.imagePath = imagePath;
    $scope.busy = true;

    Gourmets.get().success(function(data)
    {
        getLazyLoadingData($scope, data);
    });

    $scope.getDate = function(timestamp)
    {
        var newDate = new Date(timestamp);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var year = newDate.getFullYear();
        var month = months[newDate.getMonth()];
        var day = newDate.getDate();
        var date = day + ' ' + month + ' ' + year;

        return date;
    };
});