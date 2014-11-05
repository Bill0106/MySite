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
        link: function(scope, element, attrs)
        {
            var progressBar = $("[data-playstation='progressBar']");
            var circleLoading = $("[data-playstation='circleLoading']");

            var itemHover = function()
            {
                $("[data-playstation='item']").hover(function()
                {
                    $("[data-playstation='itemImage']", $(this)).addClass('flipOutY');
                }, function()
                {
                    $("[data-playstation='itemImage']", $(this)).removeClass('flipOutY').addClass('flipInY');
                });
            };

            var initLoading = function()
            {
                var item = $("[data-playstation='item']");
                var length = item.length;
                var count = 0;

                item.each(function()
                {
                    var itemImage = $("[data-playstation='itemImage']", $(this));
                    var src = $(itemImage).attr('src');
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {
                        count++;
                        var value = Math.round(count / length * 100);

                        progressBar.children().css('width', value + '%').attr('aria-valuenow', value).text(value + '%');

                        if (count == length) {
                            progressBar.addClass('fadeOut');
                            item.css('display', 'block').attr('data-visible', 1);
                            setTimeout(function()
                            {
                                item.addClass('fadeIn');
                                circleLoading.css('display', 'block').addClass('fadeIn');
                                scope.busy = false;
                                scope.$apply();
                            }, 350);
                        }
                    });
                });

                itemHover();
            };

            var loadMore = function()
            {
                var invisibleItem = $("[data-playstation='item'][data-visible='0']");
                var length = invisibleItem.length;
                var count = 0;
                console.log(length);

                scope.busy = true;
                scope.$apply();

                invisibleItem.each(function()
                {
                    var itemImage = $("[data-playstation='itemImage']", $(this));
                    var src = $(itemImage).attr('src');
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {

                        count++;

                        if (count == length) {
                            circleLoading.addClass('fadeOut');
                            setTimeout(function()
                            {
                                circleLoading.css('display', 'none');
                                invisibleItem.css('display', 'block');
                                setTimeout(function()
                                {
                                    invisibleItem.addClass('fadeIn').attr('data-visible', 1);
                                    if (length == 12) {
                                        circleLoading.css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
                                    }
                                    scope.busy = false;
                                    scope.$apply();
                                }, 100);
                            }, 350);
                        }
                    });
                });

                itemHover();
            };

            scope.$watch('val', function(newValue, oldValue)
            {
                if (!oldValue) {
                    timer(initLoading, 200);
                } else if(newValue) {
                    timer(loadMore, 200);
                }
            }, true);
        }
    };
}]);