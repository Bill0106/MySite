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
        scope: {
            val: '=gameModel'
        },
        link: function(scope, attr, element)
        {
            var pageLoading = $("[data-component='pageLoading']");
            pageLoading.addClass('fadeIn');

            var game = function()
            {
                var image = new Image();
                var src = imagePath + scope.val.image;
                var rate = scope.val.rate / 5 *100;

                $(image).attr('src', src).bind('load', function()
                {
                    pageLoading.removeClass('fadeIn').addClass('fadeOut');
                    setTimeout(function()
                    {
                        $("[data-game='content']").addClass('fadeIn');
                        setTimeout(function()
                        {
                            $("[data-game='rate']").removeClass('zoomOut').addClass('zoomIn');
                            if (rate > '50') {
                                var diff = rate - 50;
                                var array = [];
                                array['10'] = 'rotate-60';
                                array['30'] = 'rotate-80';
                                array['50'] = 'rotate-100';
                                $("[data-rate='longPart']").addClass('rotate-50');
                                setTimeout(function()
                                {
                                    $("[data-rate='shortPartRight']").addClass('show');
                                    $("[data-rate='shortPartLeft']").addClass('hide');
                                    $("[data-rate='longPart']").removeClass('rotate-50').addClass(array[diff]);
                                }, 505);
                            }
                        }, 350);
                    }, 350);
                });
            };

            scope.$watch('val', function(newValue, oldValue)
            {
                if (newValue) {
                    timer(game, 200);
                }
            }, true);
        }
    };
}]);