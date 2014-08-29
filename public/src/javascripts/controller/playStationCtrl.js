/**
 * Created by Bill on 14-8-12.
 */


var playStationCtrl = angular.module('playStationCtrl', []);

playStationCtrl.controller('playStationController', function($scope, Games)
{
    Games.get().success(function(data)
    {
        var gamesData = data.reverse();
        var length = gamesData.length;

        $scope.games = gamesData.splice(0, 24);

        $scope.loadMore = function()
        {
            if (length === 0) {
                return false;
            }

            var num = 12;

            if (num > length) {
                num = length;
            }

            var moreGames = gamesData.splice(0, num);

            angular.forEach(moreGames, function(value)
            {
                $scope.games.push(value);
            });
        };
    });

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };
});

playStationCtrl.directive('ngPlayStation', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=gamesModel'
        },
        link: function(scope, element, attrs) {
            var imageLoad = function()
            {
                $(".playstation-game-item").hover(function()
                {
                    $(".game-item-image", $(this)).addClass('flipOutY');
                }, function()
                {
                    $(".game-item-image", $(this)).removeClass('flipOutY').addClass('animated flipInY');
                });
            };

            scope.$watch('val', function(newValue, oldValue)
            {
                if (newValue) {
                    timer(imageLoad, 200);
                }
            }, true);
        }
    };
}]);