/**
 * Created by bill on 15/8/3.
 */

var gamesController = angular.module('gamesController', []);

gamesController.controller('gamesController', function($scope, Game)
{
    $scope.complete = false;

    Game.query({ limit: 20 }, function(data)
    {
        $scope.games = data;

        $scope.images = [];
        angular.forEach(data, function(value)
        {
            $scope.images.push(value.image);
        });
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
            complete: '=loadComplete'
        },
        link: function(scope, element, attrs)
        {
            function showContent()
            {
                var mask = $("[data-load='mask']");

                element.removeClass('hidden');
                setTimeout(function()
                {
                    mask.fadeOut();
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