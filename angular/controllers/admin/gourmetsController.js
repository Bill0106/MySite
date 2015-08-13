/**
 * Created by bill on 15/8/13.
 */

var gourmetsController = angular.module('gourmetsController', []);

gourmetsController.controller('gourmetsController', function($scope, Gourmet, Count)
{
    Count.get({ model: 'gourmets' }, function(count)
    {
        $scope.gourmets = Gourmet.query({ limit: count.count });
    });

});