/**
 * Created by Bill on 14-8-8.
 */

var myApp = angular.module('myApp',['ngRoute', 'ngAnimate', 'infinite-scroll', 'appRoutes', 'homeCtrl', 'homeService']);

myApp.controller('titleController', ['$scope', '$route', function($scope, $route)
{
    $scope.$on('$routeChangeSuccess', function()
    {
        $scope.title = $route.current.title;
    });
}]);

myApp.controller('headerController', ['$scope', '$location', function($scope, $location)
{
    $scope.isActive = function(viewLocation)
    {
        return viewLocation === $location.path();
    };
}]);

myApp.run(function($http)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';
});
