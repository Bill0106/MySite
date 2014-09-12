/**
 * Created by Bill on 14-9-10.
 */

var gameCtrl = angular.module('gameCtrl', []);

gameCtrl.controller('gameController', function($scope, $routeParams, Game)
{
    Game.get($routeParams.url).success(function(data)
    {
        $scope.game = data;

        $scope.image = data.image;

        $scope.descriptions = data.description.split("\n");

        var companies = data.company.split("/");

        if (companies.length == '1') {
            $scope.developer = data.company;
            $scope.publish = data.company;
        } else {
            $scope.developer = companies[0];
            $scope.publish = companies[1];
        }
    });
});

gameCtrl.directive('ngGame', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=gameModel'
        },
        link: function(scope, attr, element)
        {
            $("div.page-loading").removeClass('fadeOut').addClass('fadeIn');

            var imageLoad = function()
            {
                var image = new Image();
                var src = 'http://zhuhaolin.com/images/' + scope.val.image;

                $(image).attr('src', src).bind('load', function()
                {
                    $("div.page-loading").removeClass('fadeIn').addClass('fadeOut');
                    setTimeout(function()
                    {
                        $("section.game-detail").addClass('fadeIn');
                    }, 350);
                });
            };

            timer(imageLoad, 100);
        }
    };
}]);