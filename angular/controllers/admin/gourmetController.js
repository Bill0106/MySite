/**
 * Created by bill on 15/8/13.
 */

var gourmetController = angular.module('gourmetController', []);

gourmetController.controller('gourmetController', function($scope, $filter, $state, $stateParams, Gourmet)
{
    $scope.gourmet = new Gourmet();
    if ($stateParams.url != 'add') {
        Gourmet.get({ id: $stateParams.id }, function(data)
        {
            $scope.gourmet = data;
        });
    }

    $scope.$watch('gourmet.date', function(newValue)
    {
        $scope.gourmet.date = $filter('date')(newValue, 'yyyy-MM-dd');
    });

    $scope.fields = ['food', 'restaurant', 'date', 'image', 'url'];

    $scope.createGourmet = function()
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
});