/**
 * Created by bill on 15/7/30.
 */

var myApp = angular.module('myApp',[
    'ui.router', 'ngResource', 'appRoutes',
    'homeController', 'gamesController',
    'gamesService'
]);

myApp.run(function($rootScope, $state, $http)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

    $rootScope.imagePath = 'http://zhuhaolin.com/images/';
    $rootScope.$on('$stateChangeSuccess', function()
    {
        $rootScope.bodyClass = $state.current.controller;
        $rootScope.title = $state.current.title;
    });
});

myApp.directive('ngLoading', function()
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=loadImages'
        },
        link: function(scope, element, attrs)
        {
            function progressIncrease(total)
            {
                var mask = $("[data-load='mask']");
                var progress = $("[data-load='progress']", mask);
                var content = $("[data-load='content']");
                var count = progress.data('count');

                count++;
                var percentage = Math.floor((count / total) * 100);
                progress
                    .css('width', percentage + '%')
                    .attr('aria-valuenow', percentage)
                    .text(percentage + '%')
                    .data('count', count);

                if (count == total) {
                    content.removeClass('hidden');
                    setTimeout(function()
                    {
                        mask.fadeOut();
                    }, 300);
                }
            }

            function loadImage(item, total)
            {
                var image = new Image();
                var path = scope.$root.imagePath;
                var src = path + item;

                $(image).attr('src', src).bind('load', function()
                {
                    progressIncrease(total);
                });
            }

            scope.$watch('val', function(newValue, oldValue)
            {
                if (newValue) {
                    var total = scope.val.length;

                    angular.forEach(scope.val, function(value)
                    {
                        loadImage(value, total);
                    });
                }
            });
        }
    };
});