/**
 * Created by Bill on 14-8-8.
 */

var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.controller('homeController', function($scope){});

homeCtrl.directive('ngHome', function()
{
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs)
        {
            $("#fullpage").fullpage();
        }
    };
});