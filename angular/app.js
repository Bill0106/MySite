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
    .service('imageLoading', function()
    {
        this.images = [];

        this.addImage = function(image)
        {
            this.images.push(image);
        };

        this.getImages = function()
        {
            return this.images;
        };

        return this;
    })
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
    .directive('ngLoading', function(imageLoading)
    {
        return {
            restrict: 'A',
            replace: true,
            require: "ngModel",
            link: function(scope, element, attrs, ngModel)
            {
                function progressIncrease(total)
                {
                    var circle = $("circle", element),
                        radius = circle.attr('r'),
                        length = Math.ceil(radius * 2 * Math.PI),
                        count  = $("svg", element).data('count');

                    count++;
                    var progress = length - length * (count / total);

                    circle.css('stroke-dashoffset', progress);
                    $("svg", element).data('count', count);

                    if (count == total) {
                        setTimeout(function()
                        {
                            element.fadeOut();
                            ngModel.$setViewValue(true);
                            ngModel.$render();
                        }, 1000);
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

                scope.$watch(function()
                {
                    return imageLoading.getImages();
                }, function(newVal)
                {
                    if (newVal) {
                        angular.forEach(imageLoading.getImages(), function(value)
                        {
                            loadImage(value, newVal.length);
                        });
                    }
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