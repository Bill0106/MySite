/**
 * Created by Bill on 14-8-8.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('homeController', function($scope){});

homeCtrl.directive('ngHome', function()
{
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs)
        {
            var fullPage = $("[data-index='fullPage']");
            var section = $("[data-fullpage='section']", fullPage);
            var length = section.length;
            var windowHeight = $(window).height();
            var direction = '';
            var switchCount = 0;

            section.css('height', windowHeight);

            $(window).on('scroll', function()
            {
                var top = parseInt(fullPage.css('top'));
                var scrollTop = $(this).scrollTop();

                if (scrollTop == 1 && switchCount === 0 && top !== -windowHeight * (length - 1)) {
                    fullPage.css('top', top - windowHeight);
                    switchCount = 1;
                } else if (scrollTop == -1 && switchCount ===0 && top != 0) {
                    fullPage.css('top', top + windowHeight);
                    switchCount = 1;
                } else if (scrollTop === 0 && switchCount == 1) {
                    switchCount = 0;
                }
            });
        }
    };
});