/**
 * Created by bill on 15/8/13.
 */

angular.module('gourmetsAdmin', [])
    .controller('gourmetsController', function($scope, $stateParams, Gourmet)
    {
        $scope.currentPage = parseInt($stateParams.page) ? parseInt($stateParams.page) : 1;
        Gourmet.get({ limit: 30, page: $scope.currentPage }, function (data)
        {
            $scope.gourmets = data.list;
            $scope.totalPage = new Array(Math.ceil(data.total / 30));
        });

    })
    .controller('gourmetCreateController', function($scope, $state, Gourmet, Upload, GOURMET_FIELDS)
    {
        $scope.fields = GOURMET_FIELDS;

        $scope.$watch('file', function (file)
        {
            if (file) {
                Upload.upload({
                    url: '/api/images',
                    file: file
                }).success(function (data, status, headers, config) {
                    $scope.gourmet.image = JSON.stringify(data);
                }).error(function (data, status, headers, config) {
                    $scope.show = true;
                    $scope.result = data;
                });
            }
        });

        $scope.gourmet = new Gourmet();
        $scope.saveGourmet = function()
        {
            $scope.gourmet.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('gourmets');
                }
            });
        };
    })
    .controller('gourmetUpdateController', function($scope, $filter, $state, Gourmet, Upload, GOURMET_FIELDS)
    {
        $scope.fields = GOURMET_FIELDS;

        $scope.$watch('file', function (file)
        {
            if (file) {
                Upload.upload({
                    url: '/api/images',
                    file: file
                }).success(function (data, status, headers, config) {
                    $scope.game.image = JSON.stringify(data);
                }).error(function (data, status, headers, config) {
                    $scope.show = true;
                    $scope.result = data;
                });
            }
        });

        $scope.saveGourmet = function()
        {
            $scope.gourmet.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('gourmets');
                }
            });
        };

        $scope.loadGourmet = function()
        {
            $scope.gourmet = Gourmet.get({ id: $state.params.id });

            $scope.$watch('gourmet.date', function(newValue)
            {
                if (newValue) {
                    $scope.gourmet.date = $filter('date')(newValue, 'yyyy-MM-dd');
                }
            });
        };

        $scope.loadGourmet();
    })
    .constant('GOURMET_FIELDS', ['food', 'restaurant', 'date', 'url']);