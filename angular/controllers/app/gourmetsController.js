/**
 * Created by bill on 15/8/13.
 */

angular.module('gourmetsApp', ['infinite-scroll'])
    .controller('gourmetsController', function($scope, Gourmet)
    {
        $scope.show = true;

        var page  = 1;
        var limit = 24;
        Gourmet.get({ limit: limit }, function(data)
        {
            $scope.total = data.total;
            $scope.gourmets = data.list;

            page++;
        });

        $scope.$watch('total', function (newValue)
        {
            if (newValue) {
                var totalPage = Math.ceil($scope.total / limit);

                $scope.loadMore = function()
                {
                    $scope.busy = true;

                    if (page > totalPage) {
                        return false;
                    }

                    Gourmet.get({ page: page, limit: limit }, function (data)
                    {
                        angular.forEach(data.list, function(value)
                        {
                            $scope.gourmets.push(value);
                        });

                        $scope.busy = false;
                    });

                    page++;
                    if (page > totalPage) {
                        $scope.show = false;
                    }
                };
            }
        });
    });