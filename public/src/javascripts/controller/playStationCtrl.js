/**
 * Created by Bill on 14-8-12.
 */


var playStationCtrl = angular.module('playStationCtrl', []);

playStationCtrl.controller('playStationController', function($scope, Games)
{
    $scope.busy = true;

    Games.get().success(function(data)
    {
        var gamesData = data.reverse();
        var length = gamesData.length;

        $scope.games = gamesData.splice(0, 24);

        $scope.loadMore = function()
        {
            $scope.busy = true;

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
            val: '=gamesModel',
            busy: '=scrollBusy'
        },
        link: function(scope, element, attrs) {
            $(".progress").removeClass('fadeOut').addClass('fadeIn');

            var playStation = function()
            {
                var length = $("div.playstation-game-item").length;
                var visible = $("div.playstation-game-item[class$='fadeIn']").length;
                var pageLoad = $(".playstation-page-loading");
                var count = 0;

                if (visible !== 0) {
                    pageLoad.removeClass('fadeOut').addClass('page-loading-show fadeIn');
                }

                for (var i = 0; i < length; i++) {
                    var item = $("div.playstation-game-item").eq(i);
                    var src = $(".game-item-image", item).attr('src');
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {
                        count++;
                        var value = Math.round(count / length * 100);

                        $(".progress-bar").css('width', value + '%').attr('aria-valuenow', value).text(value + '%');
                        if (count + visible == length) {
                            pageLoad.removeClass('fadeIn').addClass('fadeOut');
                            $(".playstation-game-item").css('display', 'block');
                            setTimeout(function()
                            {
                                $(".playstation-game-item").addClass('fadeIn');
                                pageLoad.removeClass('page-loading-show');
                                $(".progress").removeClass('fadeIn').addClass('fadeOut');
                                scope.busy = false;
                                scope.$apply();
                            }, 350);
                        }
                    });
                }

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
                    timer(playStation, 200);
                }
            }, true);
        }
    };
}]);