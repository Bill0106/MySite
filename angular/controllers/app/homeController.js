/**
 * Created by bill on 15/7/30.
 */

angular.module('homeApp', [])
    .directive('ngHome', function()
    {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs)
            {
                $(document).on('swipeleft.my.index.swipe', element, function()
                {
                    element.carousel('next');
                });

                $(document).on('swiperight.my.index.swipe', element, function()
                {
                    element.carousel('prev');
                });
            }
        };
    });