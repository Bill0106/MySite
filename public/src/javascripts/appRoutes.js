/**
 * Created by Bill on 14-8-8.
 */

angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'homeController',
                title: 'Home'
            })
            .when('/playstation', {
                templateUrl: 'views/playstation.html',
                controller: 'playStationController',
                title: 'PlayStation'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);