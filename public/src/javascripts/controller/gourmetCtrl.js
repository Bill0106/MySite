/**
 * Created by Bill on 14-11-9.
 */

var gourmetCtrl = angular.module('gourmetCtrl', []);

gourmetCtrl.controller('gourmetController', function($scope, Gourmets)
{
    $scope.imagePath = imagePath;

    Gourmets.get().success(function(data)
    {
        var gourmets = data.reverse();

        $scope.gourmets = gourmets;
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

gourmetCtrl.directive('ngGourmet', ['$timeout', function(time)
{

}]);