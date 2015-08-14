/**
 * Created by bill on 15/8/3.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game, Count)
{
    $scope.show = true;

    var count = 20;
    var limit = 12;
    Game.query({ limit: count }, function(data)
    {
        $scope.games = data;

        $scope.images = [];
        angular.forEach(data, function(value)
        {
            $scope.images.push(value.image);
        });
    });

    Count.get({ model: 'games' }, function(data)
    {
        $scope.loadMore = function()
        {
            $scope.busy = true;

            if (count >= data.count) {
                $scope.show = false;
                return false;
            }

            Game.query({ offset: count, limit: limit }, function(data)
            {
                $scope.moreImages = [];
                angular.forEach(data, function(value)
                {
                    $scope.games.push(value);
                    $scope.moreImages.push(value.image);
                });
            });

            count += limit;
        };
    });

    $scope.loadComplete = function(complete)
    {
        if (complete) {
            $scope.complete = true;
        }
    };

    $scope.getNumber = function(num)
    {
        return new Array(num);
    };
});

gamesController.directive('ngGames', function()
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            complete: '=loadComplete',
            busy: '=scrollBusy',
            val: '=gameImages'
        },
        link: function(scope, element, attrs)
        {
            function imageLoading(item, callback)
            {
                var path = scope.$root.imagePath;
                var src = path + item;
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    callback();
                });
            }

            function loadMore()
            {
                scope.$watch('val', function(newValue)
                {
                    if (newValue) {
                        var count = 0;
                        var total = newValue.length;
                        angular.forEach(newValue, function(item)
                        {
                            imageLoading(item, function()
                            {
                                count++;
                                if (count == total) {
                                    $("[data-games-item]").removeClass('hidden');
                                    scope.busy = false;
                                    scope.$apply();
                                }
                            });
                        });
                    }
                });
            }

            function showContent()
            {
                element.removeClass('hidden');
                $("[data-games-item]").removeClass('hidden');
                setTimeout(function()
                {
                    $("[data-load='mask']").fadeOut();
                    loadMore();
                }, 300);
            }

            scope.$watch('complete', function(complete)
            {
                if (complete) {
                    showContent();
                }
            });
        }
    };
});