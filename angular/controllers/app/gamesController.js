/**
 * Created by bill on 15/8/3.
 */

angular.module('gamesApp', ['infinite-scroll'])
    .controller('gamesController', function($scope, Game, Count, imageLoading)
    {
        $scope.show = true;

        var count = 20;
        var limit = 12;
        Game.query({ limit: count }, function(data)
        {
            $scope.games = data;

            angular.forEach(data, function(value)
            {
                imageLoading.addImage(value.image);
            });
        });

        Count.get({ model: 'games' }, function(data)
        {
            $scope.loadMore = function()
            {
                $scope.busy = true;

                if (count >= data.count) {
                    $scope.show = false;
                    return false;
                }

                Game.query({ offset: count, limit: limit }, function(data)
                {
                    $scope.moreImages = [];
                    angular.forEach(data, function(value)
                    {
                        $scope.games.push(value);
                        $scope.moreImages.push(value.image);
                    });
                });

                count += limit;
            };
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