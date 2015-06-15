/**
 * Created by Bill on 14-8-8.
 */

var imagePath = 'http://zhuhaolin.com/images/';
var myApp = angular.module('myApp',['ui.router', 'ngAnimate', 'infinite-scroll', 'appRoutes', 'homeCtrl', 'playStationCtrl', 'playStationService', 'gameCtrl', 'gameService', 'gourmetCtrl', 'gourmetService']);

function getLazyLoadingData($scope, data)
{
    var allData = data.reverse();
    var length = allData.length;
    $scope.dataLength = length;

    $scope.dataArray = allData.splice(0, 24);

    $scope.loadMore = function()
    {
        $scope.busy = true;

        if (length === 0) {
            return false;
        }

        var num = 12;
        if (num > length) {
            num = length;
        }

        var moreData = allData.splice(0, num);
        angular.forEach(moreData, function(value)
        {
            $scope.dataArray.push(value);
        });
    };
}

myApp.run(function($rootScope, $state, $http, Game)
{
    $http.defaults.headers.common.auth = 'ljpon3UUVTMMmIhE6Kcf';

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams)
    {
        $rootScope.bodyClass = $state.current.controller;

        if (toState.name == 'game') {
            Game.get(toParams.url).success(function(data)
            {
                $rootScope.title = data.name + '_PlayStation';
            });
        } else {
            $rootScope.title = $state.current.title;
        }
    });
});

myApp.directive('ngLazyLoading', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        replace: true,
        scope: {
            val: '=loadingModel',
            busy: '=scrollBusy',
            total: '=loadingLength'
        },
        link: function(scope, element, attrs)
        {
            function imageLoading(obj, callback)
            {
                var itemImage = $("[data-lazy-loading='itemImage']", obj);
                var src = itemImage.attr('src');
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    callback();
                });
            }

            function itemVisible(item, progress, callback)
            {
                var count = 0;

                item.each(function()
                {
                    imageLoading($(this), function()
                    {
                        count++;

                        if (progress) {
                            progress.progress('increment');
                        }

                        if (count == item.length) {
                            item.attr('data-status', 1).removeClass('hidden');
                            scope.busy = false;
                            scope.$apply();

                            if (callback) {
                                callback();
                            }
                        }
                    });
                });
            }

            function initLoading()
            {
                var progressDimmer = $("[data-lazy-loading='progressDimmer']");
                var progress = $("[data-lazy-loading='progress']");
                var item = $("[data-lazy-loading='item']");
                var moreLoader = $("[data-lazy-loading='moreLoader']");

                itemVisible(item, progress, function()
                {
                    progressDimmer.dimmer('hide').removeClass('active');
                    moreLoader.removeClass('hidden');
                });
            }

            function moreLoading()
            {
                var item = $("[data-lazy-loading='item'][data-status='0']");
                var count = 0;

                console.log(item);
                itemVisible(item, null, function()
                {
                    var visibleItem = $("[data-lazy-loading='item'][data-status='1']");
                    var moreLoader = $("[data-lazy-loading='moreLoader']");

                    if (visibleItem.length === scope.total) {
                        moreLoader.addClass('hidden');
                    }
                });
            }

            scope.$watch('val', function(newValue, oldValue)
            {
                if (!oldValue) {
                    timer(initLoading, 0);
                } else {
                    timer(moreLoading, 0);
                }
            }, true);
        }
    };
}]);