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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);