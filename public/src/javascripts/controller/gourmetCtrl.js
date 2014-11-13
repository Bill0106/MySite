/**
 * Created by Bill on 14-11-9.
 */

var gourmetCtrl = angular.module('gourmetCtrl', []);

gourmetCtrl.controller('gourmetController', function($scope, Gourmets)
{
    $scope.imagePath = imagePath;

    $scope.busy = true;

    Gourmets.get().success(function(data)
    {
        var gourmetsData = data.reverse();
        var length = gourmetsData.length;

        $scope.gourmets = gourmetsData.splice(0, 24);

        $scope.loadMore = function()
        {
            $scope.busy = true;

            if (length === 0) {
                return false;
            }

            var num = 12;

            if (num > length) {
                num = length;
            }

            var moreGourmets = gourmetsData.splice(0, num);

            angular.forEach(moreGourmets, function(value)
            {
                $scope.gourmets.push(value);
            });
        };
    });

    $scope.getDate = function(timestamp)
    {
        var newDate = new Date(timestamp);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var year = newDate.getFullYear();
        var month = months[newDate.getMonth()];
        var day = newDate.getDate();
        var date = day + ' ' + month + ' ' + year;

        return date;
    };
});

gourmetCtrl.directive('ngGourmet', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=gourmetsModel',
            busy: '=scrollBusy'
        },
        link: function(scope, element, attrs)
        {
            var progressBar = $("[data-gourmet='progressBar']");
            var circleLoading = $("[data-gourmet='circleLoading']");

            var initLoading = function()
            {
                var item = $("[data-gourmet='item']");
                var length = item.length;
                var count = 0;

                item.each(function()
                {
                    var itemImage = $("[data-gourmet='itemImage']", $(this));
                    var src = $(itemImage).attr('src');
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {
                        count++;
                        var value = Math.round(count / length * 100);

                        progressBar.children().css('width', value + '%').attr('aria-valuenow', value).text(value + '%');

                        if (count == length) {
                            progressBar.addClass('fadeOut');
                            item.css('display', 'block').attr('data-visible', 1);
                            setTimeout(function()
                            {
                                item.addClass('fadeIn');
                                circleLoading.css('display', 'block').addClass('fadeIn');
                                scope.busy = false;
                                scope.$apply();
                            }, 350);
                        }
                    });
                });
            };

            var loadMore = function()
            {
                var invisibleItem = $("[data-gourmet='item'][data-visible='0']");
                var length = invisibleItem.length;
                var count = 0;
                console.log(length);

                scope.busy = true;
                scope.$apply();

                invisibleItem.each(function()
                {
                    var itemImage = $("[data-gourmet='itemImage']", $(this));
                    var src = $(itemImage).attr('src');
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {

                        count++;

                        if (count == length) {
                            circleLoading.addClass('fadeOut');
                            setTimeout(function()
                            {
                                circleLoading.css('display', 'none');
                                invisibleItem.css('display', 'block');
                                setTimeout(function()
                                {
                                    invisibleItem.addClass('fadeIn').attr('data-visible', 1);
                                    if (length == 12) {
                                        circleLoading.css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
                                    }
                                    scope.busy = false;
                                    scope.$apply();
                                }, 100);
                            }, 350);
                        }
                    });
                });
            };

            scope.$watch('val', function(newValue, oldValue)
            {
                if (!oldValue) {
                    timer(initLoading, 200);
                } else if(newValue) {
                    timer(loadMore, 200);
                }
            }, true);
        }
    };
}]);