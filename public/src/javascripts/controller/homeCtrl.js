/**
 * Created by Bill on 14-8-8.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('homeController', function($scope, homeLinks)
{
    $scope.formData = {};

    homeLinks.get().success(function(data)
    {
        $scope.homeLinks = data;
    });

    $scope.mouseEnter = function(homeLink)
    {
        $scope.title = homeLink.title;
    };

    $scope.mouseLeave = function()
    {
        $scope.title = '';
    };
});

homeCtrl.directive('ngHome', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs)
        {
            var imageLoad = function()
            {
                var backgroundImage = new Image();

                $(backgroundImage).attr('src', 'http://bill0106.com/images/505afb6ff668f345f4b5ea4cd1fba976.jpg').bind('load', function()
                {
                    $("div.page-loading").addClass('animated fadeOut');
                    setTimeout(function()
                    {
                        element.addClass('animated fadeIn');
                    }, 350);
                });
            };

            timer(imageLoad, 0);
        }
    };
}]);