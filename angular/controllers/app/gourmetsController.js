/**
 * Created by bill on 15/8/13.
 */

angular.module('gourmetsApp', ['infinite-scroll'])
    .controller('gourmetsController', function($scope, Gourmet, Count, imageLoading)
    {
        $scope.show = true;

        var count = 24;
        var limit = 18;
        Gourmet.query({ limit: count }, function(data)
        {
            $scope.gourmets = data;

            angular.forEach(data, function(item)
            {
                imageLoading.addImage(item.image);
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
    })
    .directive('ngGourmets', function($timeout)
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

                scope.$watch('complete', function(complete)
                {
                    if (complete) {
                        $("[data-gourmet-item]").removeClass('hidden');
                    }
                });
            }
        };
    });