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

            section.css('height', windowHeight);

            $(window).on('scroll', function()
            {
                var top = parseInt(fullPage.css('top'));
                var scrollTop = $(this).scrollTop();

                if (scrollTop > 0) {
                    direction = true;
                } else if (scrollTop < 0) {
                    direction = false;
                }

                if (scrollTop === 0) {
                    if (direction && top !== -windowHeight * (length - 1)) {
                        fullPage.css('top', top - windowHeight);
                    } else if (!direction && top !== 0) {
                        fullPage.css('top', top + windowHeight);
                    }
                }
            });
        }
    };
});