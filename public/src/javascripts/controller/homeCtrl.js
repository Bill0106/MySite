/**
 * Created by Bill on 14-8-8.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('homeController', function($scope)
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
            var fullPage = $("[data-index='fullPage']");
            var section = $("[data-full-page='section']", fullPage);
            var cell = $("[data-full-page='cell']", fullPage);
            var length = section.length;
            var windowHeight = $(window).height();
            var switchCount = 0;

            var scrollFullPage = function()
            {
                section.css('height', windowHeight);

                cell.each(function()
                {
                    var cellHeight = $(this).height();

                    $(this).css({
                        'padding-top': (windowHeight - cellHeight) / 2,
                        'padding-bottom': (windowHeight - cellHeight) / 2
                    });
                });


                $(window).on('scroll', function()
                {
                    var top = parseInt(fullPage.css('top'));
                    var scrollTop = $(this).scrollTop();

                    if (scrollTop == 1 && switchCount === 0 && top !== -windowHeight * (length - 1)) {
                        fullPage.css('top', top - windowHeight);
                        switchCount = 1;
                    }

                    if (scrollTop == -1 && switchCount ===0 && top !== 0) {
                        fullPage.css('top', top + windowHeight);
                        switchCount = 1;
                    }

                    if (scrollTop === 0 && switchCount == 1) {
                        switchCount = 0;
                    }
                });
            };

            var image = new Image();
            var src = imagePath + '73ad5a84dcefe956276f1bd07c6316dd.jpg';
            var pageLoading = $("[data-component='pageLoading']");

            $(image).attr('src', src).bind('load', function()
            {
                pageLoading.addClass('fadeOut');

                setTimeout(function()
                {
                    fullPage.addClass('fadeIn');
                }, 350);

                scrollFullPage();
            });
        }
    };
}]);