/**
 * Created by Bill on 14-8-12.
 */


var playStationCtrl = angular.module('playStationCtrl', []);

playStationCtrl.controller('playStationController', function($scope, Games)
{
    Games.get().success(function(data)
    {
        var gamesData = data.reverse();
        var length  = gamesData.length;
        var count = Math.ceil(length / 3);
        var start = 0;
        var gamesArray = [];

        for (var i = 0; i < count; i++) {
            var end = start + 3;
            if (end > length) {
                end = length;
            }
            gamesArray.push(gamesData.slice(start, end));
            start += 3;
        }

        $scope.gamesArray = gamesArray.splice(0, 4);

        $scope.loadMore = function()
        {
            var num = 2;
            var total = gamesArray.length;

            if (total < num) {
                num = total;
            }

            var gamesMore = gamesArray.splice(0, num);

            angular.forEach(gamesMore, function(value)
            {
                $scope.gamesArray.push(value);
            });
        };
    });

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };
});