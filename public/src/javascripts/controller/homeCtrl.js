/**
 * Created by Bill on 14-8-8.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('homeController', function($scope, $state)
{
    $scope.imagePath = imagePath;
});

homeCtrl.directive('ngHome',['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs)
        {
            var fullPageContainer = $("[data-full-page='container']");
            var fullPageSection = $("[data-full-page='section']");
            var fullPageSectionLength = fullPageSection.length;
            var windowHeight = $(window).height();

            fullPageSection.each(function()
            {
                var sectionHeight = $(this).height();

                $(this).css({
                    'padding-top': ((windowHeight - sectionHeight) / 2) - 100,
                    'height': windowHeight
                });
            });

            fullPageContainer.on('mousewheel', function(event)
            {
                var direction = event.deltaY;
                var style = window.getComputedStyle($(this)[0], null);
                var matrix = new WebKitCSSMatrix(style.webkitTransform);

                if (direction < -100 && matrix.m42 % windowHeight === 0 && matrix.m42 != -windowHeight * (fullPageSectionLength - 1)) {
                    $(this).css('transform', 'translate(0, '+ (matrix.m42 - windowHeight) + 'px)');
                } else if (direction > 100 && matrix.m42 % windowHeight === 0 && matrix.m42 !== 0) {
                    $(this).css('transform', 'translate(0, '+ (matrix.m42 + windowHeight) + 'px)');
                }
            });

            var image = new Image();
            var src = imagePath + '73ad5a84dcefe956276f1bd07c6316dd.jpg';
            var pageLoading = $("[data-index='pageLoading']");

            $(image).attr('src', src).bind('load', function()
            {
                pageLoading.dimmer('hide').removeClass('active');
                fullPageContainer.transition('fade');
            });
        }
    };
}]);