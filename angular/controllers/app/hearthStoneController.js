/**
 * Created by bill on 15/8/25.
 */

angular.module('hearthStoneApp', [])
    .controller('hsSeasonsController', function($scope, HSSeason, imageLoading)
    {
        HSSeason.query(function(data)
        {
            $scope.seasons = data;

            angular.forEach(data, function(value)
            {
                imageLoading.addImage(value.image);
            });
        });

        $scope.loadComplete = function(complete)
        {
            if (complete) {
                $scope.complete = true;
            }
        };
    })
    .controller('hsSeasonController', function($rootScope, $scope, $state, HSSeason, HSDeck, HSMatch, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        HSSeason.get({ url: $state.params.url }, function(data)
        {
            $rootScope.title = data.title + '_My HearthStone Seasons';
            $scope.season = data;
        });

        // Get Season Matches
        $scope.$watch('season.month', function(newValue)
        {
            if (newValue) {
                HSMatch.get({ season: newValue}, function(data)
                {
                    $scope.matches = data.list;
                });
            }
        });

        // Get Season Decks
        $scope.$watch('matches', function(newValue)
        {
            if (newValue) {
                var ids = [];
                var count = 0;
                angular.forEach(newValue, function(value)
                {
                    if (ids.indexOf(value.deck_id) < 0) {
                        ids.push(value.deck_id);
                    }
                    count++;

                    if (count == newValue.length) {
                        var str = ids.join();

                        HSDeck.query({ ids: str }, function(data)
                        {
                            var decks = {};
                            var count = 0;
                            angular.forEach(data, function(value)
                            {
                                decks[value._id] = value;
                                count++;

                                if (count = data.length) {
                                    $scope.decks = decks;
                                }
                            });

                        });
                    }
                });
            }
        });

        // Format Season Matches
        //$scope.$watch('wins', function(wins)
        //{
        //    if (wins) {
        //        var array = [];
        //        for (var i = 0; i < HS_PLAYER_CLASSES.length; i++) {
        //            sum(i, array);
        //        }
        //    }
        //
        //    function sum(i, array)
        //    {
        //        var win = 0;
        //        var total = 0;
        //        angular.forEach(wins, function(value)
        //        {
        //            if (value.detail[0][i]) {
        //                win += parseInt(value.detail[0][i].win);
        //                total += parseInt(value.detail[0][i].total);
        //                array[i] = {
        //                    win: win,
        //                    total: total
        //                };
        //
        //                if (array.length == HS_PLAYER_CLASSES.length) {
        //                    $scope.total = array;
        //                }
        //            }
        //        });
        //    }
        //});
    })
    .controller('hsDeckController', function($rootScope, $scope, $state, HSDeck, HSDeckWin, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        HSDeck.get({ id: $state.params.id }, function(data)
        {
            $scope.deck = data;
        });

        $scope.$watch('deck._id', function(newValue)
        {
            if (newValue) {
                HSDeckWin.query({ id : newValue }, function(data)
                {
                    $scope.wins = data;
                });
            }
        });

        $scope.$watch('wins', function(wins)
        {
            if (wins) {
                var winsArray = [];
                angular.forEach(wins, function(value)
                {
                    winsArray.push(value.win);

                    if (winsArray.length == wins.length) {
                        var array = [];
                        for (var i = 0; i < HS_PLAYER_CLASSES.length; i++) {
                            sum(i, array);
                        }
                    }


                    $scope.overall = {
                        win: 0,
                        total: 0
                    };
                    angular.forEach(winsArray, function(item)
                    {
                        $scope.overall.win += item.overall[0].win;
                        $scope.overall.total += item.overall[0].total;
                    });
                });
            }

            function sum(i, array)
            {
                var win = 0;
                var total = 0;
                angular.forEach(winsArray, function(item)
                {
                    if (item.detail[0][i]) {
                        win += parseInt(item.detail[0][i].win);
                        total += parseInt(item.detail[0][i].total);
                        array[i] = {
                            win: win,
                            total: total
                        };
                    } else {
                        array[i] = {
                            win: '--',
                            total: '--'
                        };
                    }

                    if (array.length == HS_PLAYER_CLASSES.length) {
                        $scope.total = array;
                    }
                });
            }
        });
    });