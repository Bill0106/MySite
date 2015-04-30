/**
 * Created by Bill on 14-9-10.
 */

var gameCtrl = angular.module('gameCtrl', []);

gameCtrl.controller('gameController', function($scope, $stateParams, Game)
{
    Game.get($stateParams.url).success(function(data)
    {
        $scope.imagePath = imagePath;

        $scope.game = data;

        $scope.descriptions = data.description.split("\n");

        var rateText = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];
        $scope.rateText = rateText[data.rate - 1];

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
        link: function(scope, attr, element)
        {
            function gamePageLoading()
            {
                var pageLoading = $("[data-game='pageLoading']");
                var gameDetail = $("[data-game='detail']");
                var gameImage = $("[data-game='image']");
                var src = gameImage.attr('src');
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    pageLoading.dimmer('hide').removeClass('active');
                    gameDetail.transition('show');
                });
            }

            timer(gamePageLoading, 500);
        }
    };
}]);