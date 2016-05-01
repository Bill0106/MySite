/**
 * Created by bill on 15/8/13.
 */

angular.module('gourmetsAdmin', [])
    .controller('gourmetsController', function($scope, Gourmet, Count)
    {
        Count.get({ model: 'gourmets' }, function(count)
        {
            $scope.count = count.count;
            $scope.gourmets = Gourmet.query({ limit: count.count });
        });

    })
    .controller('gourmetCreateController', function($scope, $state, Gourmet, imageUpload, GOURMET_FIELDS)
    {
        $scope.fields = GOURMET_FIELDS;

        $scope.$watch('file', function (file)
        {
            if (file) {
                var image = imageUpload.uploadImage(file);
                if (image.success) {
                    $scope.gourmet.image = image.image;
                }
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
    .controller('gourmetUpdateController', function($scope, $filter, $state, Gourmet, imageUpload, GOURMET_FIELDS)
    {
        $scope.fields = GOURMET_FIELDS;

        $scope.$watch('file', function (file)
        {
            if (file) {
                var image = imageUpload.uploadImage(file);
                if (image.success) {
                    $scope.gourmet.image = image.image;
                }
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