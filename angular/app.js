/**
 * Created by bill on 15/7/30.
 */

angular.module('myApp',[
    'ui.router', 'angularLazyImg', 'appRoutes',
    'gamesApp', 'gourmetsApp', 'hearthStoneApp',
    'myServices', 'myConfig'])
    .run(function($rootScope, $location, $state, $http)
    {
        $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

        $rootScope.$on('$stateChangeSuccess', function()
        {
            $rootScope.bodyClass = $state.current.controller;
            $rootScope.title = $state.current.title;
        });
    })
    .config(['lazyImgConfigProvider', function(lazyImgConfigProvider)
    {
        lazyImgConfigProvider.setOptions({
            successClass: 'success'
        });
    }])
    .directive('ngMySite', function()
    {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs)
            {
                $(document).on('swipeleft.my.index.swipe', "#indexCarousel", function()
                {
                    $(this).carousel('next');
                });
                $(document).on('swiperight.my.index.swipe', "#indexCarousel", function()
                {
                    $(this).carousel('prev');
                });
            }
        };
    })
    .filter('imageHelper', function()
    {
        return function (image, field)
        {
            var data = '';
            if (typeof image !== 'undefined') {
                if (field == 'color') {
                    var color = JSON.parse(image).color;
                    data = '#' + color.substr(2);
                } else {
                    data = JSON.parse(image).url;
                }
            }

            return data;
        };
    })
    .filter('imageUrl', function ()
    {
        return function (image)
        {
            if (typeof image !== 'undefined') {
                return JSON.parse(image).url;
            }
        };
    });