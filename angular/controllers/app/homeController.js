/**
 * Created by bill on 15/7/30.
 */

var homeController = angular.module('homeController', []);

homeController.controller('homeController', function($scope)
{
    $scope.items = [
        {
            'title' : "Bill's Hobby - Write as a Interest",
            'icon' : "1b11d8d7a005a06b42514f5d9022e1df.jpg",
            'background' : "73ad5a84dcefe956276f1bd07c6316dd.jpg"
        },
        {
            'title' : "PlayStation Games",
            'icon' : "84abb1fdfd670845666ac89f712b539a.jpg",
            'background' : "66a7d162d0bdf9aa302e280cbb5d90d6.jpg",
            'url': 'games'
        },
        {
            'title' : "Gourmet Tour",
            'icon' : "09d6aeb87783661768b52c73f18c3069.jpg",
            'background' : "a15bc6b5656eb67d2e0cde3c2e7f583a.jpg"
        },
        {
            'title' : "HearthStone",
            'icon' : "fd7f11741da6dd01db206a29d0536427.jpg",
            'background' : "5233e5089e1ff5fff7a85c8aa13304ff.jpg"
        },
        {
            'title' : "Manchester United",
            'icon' : "a8ae912e1037ff7b5e75d4660682bf12.jpg",
            'background' : "abb4387b620523942e197d39bf38b611.jpg"
        },
        {
            'title' : "Gyakuten Saiban",
            'icon' : "4b654282902acbaf2b3ac3051b574717.jpg",
            'background' : "566b87a4710605f312ec139dcd71088a.jpg"
        }
    ];
});

homeController.directive('ngHome', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=indexModel'
        },
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

            function progressIncrease()
            {
                var loadingMask = $("[data-app-index='loadingMask']");
                var loadingProgress = $("[data-app-index='loadingProgress']", loadingMask);
                var count = loadingProgress.data('count');

                count++;
                var percentage = Math.floor((count / (scope.val.length * 2)) * 100);
                loadingProgress
                    .css('width', percentage + '%')
                    .attr('aria-valuenow', percentage)
                    .text(percentage + '%')
                    .data('count', count);

                if (count == (scope.val.length * 2)) {
                    loadingMask.fadeOut();
                    startCarousel();
                }
            }

            function imageLoad(src)
            {
                var image = new Image();
                var path = scope.$root.imagePath;
                src = path + src;

                $(image).attr('src', src).bind('load', function()
                {
                    progressIncrease();
                });
            }

            function loadingImages()
            {
                var items = scope.val;

                $(items).each(function()
                {
                    var item = $(this)[0];

                    imageLoad(item.icon);
                    imageLoad(item.background);
                });
            }

            timer(loadingImages, 0);
        }
    };
}]);