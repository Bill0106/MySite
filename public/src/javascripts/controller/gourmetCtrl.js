/**
 * Created by Bill on 14-11-9.
 */

var gourmetCtrl = angular.module('gourmetCtrl', []);

gourmetCtrl.controller('gourmetController', function($scope)
{
    $scope.imagePath = imagePath;
});

gourmetCtrl.directive('ngGourmet', ['$timeout', function(time)
{

}]);