/**
 * Created by bill on 15/8/13.
 */

var gourmetsController = angular.module('gourmetsController', []);

gourmetsController.controller('gourmetsController', function($scope, Gourmet, Count)
{
    $scope.show = true;

    var count = 24;
    var limit = 18;
    Gourmet.query({ limit: count }, function(data)
    {
        $scope.gourmets = data;

        $scope.images = [];
        angular.forEach(data, function(item)
        {
            $scope.images.push(item.image);
        });
    });

    Count.get({ model: 'gourmets' }, function(data)
    {
        $scope.loadMore = function()
        {
            $scope.busy = true;

            if (count >= data.count) {
                $scope.show = false;
                return false;
            }

            Gourmet.query({ offset: count, limit: limit }, function(data)
            {
                $scope.moreImages = [];
                angular.forEach(data, function(value)
                {
                    $scope.gourmets.push(value);
                    $scope.moreImages.push(value.image);
                });
            });

            count += limit;
        };
    });

    $scope.loadComplete = function(complete)
    {
        if (complete) {
            $scope.complete = true;
        }
    };
});

gourmetsController.directive('ngGourmets', function()
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            complete: '=loadComplete',
            busy: '=scrollBusy',
            val: '=gourmetImages'
        },
        link: function(scope, element, attrs)
        {
            function imageLoading(item, callback)
            {
                var path = scope.$root.imagePath;
                var src = path + item;
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    callback();
                });
            }

            function loadMore()
            {
                scope.$watch('val', function(newValue)
                {
                    if (newValue) {
                        var count = 0;
                        var total = newValue.length;
                        angular.forEach(newValue, function(item)
                        {
                            imageLoading(item, function()
                            {
                                count++;
                                if (count == total) {
                                    $("[data-gourmet-item]").removeClass('hidden');
                                    scope.busy = false;
                                    scope.$apply();
                                }
                            });
                        });
                    }
                });
            }

            function showContent()
            {
                element.removeClass('hidden');
                $("[data-gourmet-item]").removeClass('hidden');
                setTimeout(function()
                {
                    $("[data-load='mask']").fadeOut();
                    loadMore();
                }, 300);
            }

            scope.$watch('complete', function(complete)
            {
                if (complete) {
                    showContent();
                }
            });
        }
    };
});