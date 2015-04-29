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
        var gamesData = data.reverse();
        var length = gamesData.length;
        $scope.gamesLength = length;

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
            total: '=gamesLength',
            busy: '=scrollBusy'
        },
        link: function(scope, element, attrs)
        {
            var list = $("[data-playstation='list']");
            list.transition('fade');

            function imageLoading(obj, callback)
            {
                var itemImage = $("[data-playstation='itemImage']", obj);
                var src = itemImage.attr('src');
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    callback();
                });
            }

            function itemVisible(item, progress, callback)
            {
                var count = 0;

                item.each(function()
                {
                    var itemInfo = $("[data-playstation='itemInfo']", $(this));
                    itemInfo.dimmer({
                        on: 'hover'
                    });

                    imageLoading($(this), function()
                    {
                        count++;

                        if (progress) {
                            progress.progress('increment');
                        }

                        if (count == item.length) {
                            item.attr('data-status', 1).removeClass('hidden');
                            scope.busy = false;
                            scope.$apply();

                            if (callback) {
                                callback();
                            }
                        }
                    });
                });
            }

            function initLoading()
            {
                var progressDimmer = $("[data-playstation='progressDimmer']");
                var progress = $("[data-playstation='progress']");
                var item = $("[data-playstation='item']");

                itemVisible(item, progress, function()
                {
                    progressDimmer.dimmer('hide').removeClass('active');
                    list.transition('fade');
                });
            }

            function moreLoading()
            {
                var item = $("[data-playstation='item'][data-status='0']");
                var count = 0;

                itemVisible(item, null, function()
                {
                    var visibleItem = $("[data-playstation='item'][data-status='1']");
                    var moreLoader = $("[data-playstation='moreLoader']");

                    if (visibleItem.length === scope.total) {
                        moreLoader.addClass('hidden');
                    }
                });
            }

            scope.$watch('val', function(newValue, oldValue)
            {
                if (!oldValue) {
                    timer(initLoading, 0);
                } else if (newValue) {
                    timer(moreLoading, 0);
                }
            }, true);

        }
    };
}]);