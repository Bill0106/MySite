/**
 * Created by bill on 15/8/3.
 */

angular.module('gamesApp', ['infinite-scroll'])
    .controller('gamesController', function($scope, Game, imageLoading)
    {
        $scope.show = true;

        var page  = 1;
        var limit = 20;
        Game.get({ limit: limit }, function(data)
        {
            $scope.games = data.list;
            $scope.total = data.total;

            page++;
            angular.forEach(data.list, function(value)
            {
                imageLoading.addImage(value.image);
            });
        });

        $scope.$watch('total', function (newVal)
        {
            if (newVal) {
                var totalPage = Math.ceil($scope.total / limit);

                $scope.loadMore = function()
                {
                    $scope.busy = true;

                    if (page > totalPage) {
                        $scope.show = false;
                        return false;
                    }

                    Game.get({ page: page, limit: limit }, function(data)
                    {
                        $scope.moreImages = [];
                        angular.forEach(data.list, function(value)
                        {
                            $scope.games.push(value);
                            $scope.moreImages.push(value.image);
                        });
                    });

                    page++;
                };
            }
        });

        $scope.loadComplete = function(complete)
        {
            if (complete) {
                $scope.complete = true;
            }
        };

        $scope.getNumber = function(num)
        {
            return new Array(num);
        };
    })
    .controller('gameController', function($scope, $rootScope, $state, $filter, Game, GameTrophy, GAME_PLATFORMS, GAME_GENRES, GAME_TROPHY_RARITY)
    {
        Game.get({ url: $state.params.url }, function(data)
        {
            $rootScope.title = data.name + '_My Games';
            $scope.game = data;
        });

        $scope.platforms = GAME_PLATFORMS;
        $scope.genres = GAME_GENRES;
        $scope.trophy_rarity = GAME_TROPHY_RARITY;

        $scope.rateText = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];

        $scope.getParagraph = function(text)
        {
            if (text) {
                return text.split('\n');
            }
        };

        $scope.$watch('game.trophies', function(trophy_id)
        {
            if (trophy_id) {
                GameTrophy.get({ id: trophy_id }, function(data)
                {
                    $scope.trophies = data.trophies;
                    $scope.trophies_completed = $filter('number')((data.earned / data.total) * 100, 0);
                });
            }
        });
    })
    .directive('ngGames', function()
    {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                busy: '=scrollBusy',
                val: '=gameImages',
                complete: '=loadComplete'
            },
            link: function(scope, element, attrs)
            {
                function imageLoading(item, callback)
                {
                    var path = scope.$root.imagePath;
                    var src = path + item;
                    var image = new Image();

                    $(image).attr('src', src).bind('load', function()
                    {
                        callback();
                    });
                }

                scope.$watch('val', function(newValue)
                {
                    if (newValue) {
                        var count = 0;
                        var total = newValue.length;
                        angular.forEach(newValue, function(item)
                        {
                            imageLoading(item, function()
                            {
                                count++;
                                if (count == total) {
                                    $("[data-games-item]").removeClass('hidden');
                                    scope.busy = false;
                                    scope.$apply();
                                }
                            });
                        });
                    }
                });

                scope.$watch('complete', function(complete)
                {
                    if (complete) {
                        $("[data-games-item]").removeClass('hidden');
                    }
                });
            }
        };
    });