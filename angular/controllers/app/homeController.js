/**
 * Created by bill on 15/7/30.
 */

var homeController = angular.module('homeController', []);

homeController.controller('homeController', function($scope, $state)
{
});

homeController.directive('ngHome', function()
{
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, element, attrs)
        {
            function startCarousel()
            {
                var carousel = $("[data-app-index='carousel']");
                var carouselSlide = $("[data-slide]", carousel);
                carousel.carousel({
                    pause: "false"
                });
                carouselSlide.click(function(e)
                {
                    e.preventDefault();
                });
            }

            function backgroundLoad(src)
            {
                var loadingMask = $("[data-app-index='loadingMask']");
                var loadingProgress = $("[data-app-index='loadingProgress']", loadingMask);
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    var percentage = Math.floor((count / length) * 100);
                    loadingProgress.css('width', percentage + '%').text(percentage + '%').attr('aria-valuenow', percentage);

                    if (percentage == 100) {
                        setTimeout(function()
                        {
                            loadingMask.fadeOut();
                            startCarousel();
                        }, 300);
                    }
                });
            }

            var backgroundImages = [
                '73ad5a84dcefe956276f1bd07c6316dd.jpg',
                '66a7d162d0bdf9aa302e280cbb5d90d6.jpg',
                'a15bc6b5656eb67d2e0cde3c2e7f583a.jpg',
                'abb4387b620523942e197d39bf38b611.jpg',
                '566b87a4710605f312ec139dcd71088a.jpg',
                '5233e5089e1ff5fff7a85c8aa13304ff.jpg'
            ];
            var length = backgroundImages.length;
            var count = 0;

            for (var i = 0; i < length; i++) {
                var src = scope.imagePath + backgroundImages[i];

                count++;
                backgroundLoad(src);
            }
        }
    };
});