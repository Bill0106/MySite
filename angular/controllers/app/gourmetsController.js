/**
 * Created by bill on 15/8/13.
 */

var gourmetsController = angular.module('gourmetsController', []);

gourmetsController.controller('gourmetsController', function($scope, Gourmet)
{
    var count = 24;
    Gourmet.query({ limit: count },function(data)
    {
        $scope.gourmets = data;
    });
});