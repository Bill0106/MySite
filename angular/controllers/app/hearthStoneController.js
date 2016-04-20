/**
 * Created by bill on 15/8/25.
 */

angular.module('hearthStoneApp', [])
    .controller('hsSeasonsController', function ($scope, HSSeason, imageLoading) {
        HSSeason.query(function (data) {
            $scope.seasons = data;

            angular.forEach(data, function (value) {
                imageLoading.addImage(value.image);
            });
        });

        $scope.loadComplete = function (complete) {
            if (complete) {
                $scope.complete = true;
            }
        };
    })
    .controller('hsSeasonController', function ($rootScope, $scope, $state, HSSeason, HSDeck, HSMatch, hearthStoneMatches, HS_PLAYER_CLASSES) {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        // Get Season
        HSSeason.get({url: $state.params.url}, function (data) {
            $rootScope.title = data.title + '_My HearthStone Seasons';
            $scope.season = data;
        });

        // Get Season Matches
        $scope.$watch('season.month', function (newValue) {
            if (newValue) {
                HSMatch.get({season: newValue}, function (data) {
                    $scope.matches = data.list;
                });
            }
        });

        // Get Season Decks
        $scope.$watch('matches', function (newValue) {
            if (newValue.length > 0) {
                var ids = hearthStoneMatches.getMatchDecks(newValue);

                HSDeck.query({ids: ids.join()}, function (data) {
                    $scope.decks = {};
                    angular.forEach(data, function (value) {
                        $scope.decks[value._id] = value;
                    });
                });
            }
        });

        // Format Season Matches
        $scope.$watch('decks', function (newValue) {
            if (newValue) {
                $scope.deckTotalStats = {};
                $scope.deckDetailStats = {};
                $scope.seasonDetailStats = {};
                angular.forEach(newValue, function (value) {
                    var deckMatches = hearthStoneMatches.getMatchesByDeck(value._id, $scope.matches);
                    $scope.deckTotalStats[value._id] = {
                        win: hearthStoneMatches.getMatchesByResult(1, deckMatches).length,
                        lose: hearthStoneMatches.getMatchesByResult(0, deckMatches).length
                    };

                    var detail = {};
                    angular.forEach(HS_PLAYER_CLASSES, function (item) {
                        var deckOpponentMatches = hearthStoneMatches.getMatchesByOpponent(item.value, deckMatches);
                        var seasonOpponentMatches = hearthStoneMatches.getMatchesByOpponent(item.value, $scope.matches);

                        detail[item.value] = {
                            win: hearthStoneMatches.getMatchesByResult(1, deckOpponentMatches).length,
                            lose: hearthStoneMatches.getMatchesByResult(0, deckOpponentMatches).length
                        };

                        $scope.seasonDetailStats[item.value] = {
                            win: hearthStoneMatches.getMatchesByResult(1, seasonOpponentMatches).length,
                            lose: hearthStoneMatches.getMatchesByResult(0, seasonOpponentMatches).length
                        };
                    });
                    $scope.deckDetailStats[value._id] = detail;
                });

                $scope.seasonTotalStats = {
                    win: hearthStoneMatches.getMatchesByResult(1, $scope.matches).length,
                    lose: hearthStoneMatches.getMatchesByResult(0, $scope.matches).length
                };
            }
        });
    })
    .controller('hsDeckController', function ($rootScope, $scope, $state, HSDeck, HSMatch, HS_PLAYER_CLASSES) {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        HSDeck.get({id: $state.params.id}, function (data) {
            $scope.deck = data;
        });

        $scope.$watch('deck._id', function (newValue) {
            if (newValue) {
                HSDeckWin.query({id: newValue}, function (data) {
                    $scope.wins = data;
                });
            }
        });

        $scope.$watch('wins', function (wins) {
            if (wins) {
                var winsArray = [];
                angular.forEach(wins, function (value) {
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
                    angular.forEach(winsArray, function (item) {
                        $scope.overall.win += item.overall[0].win;
                        $scope.overall.total += item.overall[0].total;
                    });
                });
            }

            function sum(i, array) {
                var win = 0;
                var total = 0;
                angular.forEach(winsArray, function (item) {
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
    })
    .service('hearthStoneMatches', function () {
        this.getMatchDecks = function (matches) {
            var ids = [];
            if (!matches) {
                return ids;
            }

            angular.forEach(matches, function (value) {
                if (ids.indexOf(value.deck_id) < 0) {
                    ids.push(value.deck_id);
                }
            });

            return ids;
        };

        this.getMatchesByDeck = function (id, matches) {
            function byDeck(id) {
                return function (value) {
                    return value.deck_id == id;
                };
            }

            return matches.filter(byDeck(id));
        };

        this.getMatchesByResult = function (result, matches) {
            function byResult(result) {
                if (result == 1) {
                    return function (value) {
                        return value.result == result;
                    };
                } else {
                    return function (value) {
                        return value.result != 1;
                    };
                }
            }

            return matches.filter(byResult(result));
        };

        this.getMatchesByOpponent = function (opponent, matches) {
            function byOpponent(opponent) {
                return function (value) {
                    return value.opponent == opponent;
                };
            }

            return matches.filter(byOpponent(opponent));
        };

        return this;
    });