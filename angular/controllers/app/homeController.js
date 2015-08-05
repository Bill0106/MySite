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

    $scope.images = [];
    angular.forEach($scope.items, function(value)
    {
        $scope.images.push(value.background);
        $scope.images.push(value.icon);
    });
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
                var pause  = $("[data-app-index='pauseCarousel']");

                carousel.carousel({
                    pause: "false"
                });
                pause.hover(
                    function()
                    {
                        carousel.carousel('pause');
                    }, function()
                    {
                        carousel.carousel('cycle');
                    }
                );
                carouselSlide.click(function(e)
                {
                    e.preventDefault();
                });
            }

            timer(startCarousel, 0);
        }
    };
}]);