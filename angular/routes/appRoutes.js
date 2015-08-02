/**
 * Created by bill on 15/7/30.
 */

angular.module('appRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/views/index.html',
                controller: 'homeController',
                title: 'Home'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });