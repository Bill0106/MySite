/**
 * Created by bill on 15/8/25.
 */

angular.module('hearthStoneApp', [])
    .controller('hsSeasonsController', function ($scope, HSSeason, imageLoading)
    {
        HSSeason.query(function (data)
        {
            $scope.seasons = data;

            angular.forEach(data, function (value)
            {
                imageLoading.addImage(value.image);
            });
        });

        $scope.loadComplete = function (complete)
        {
            if (complete) {
                $scope.complete = true;
            }
        };
    })
    .controller('hsSeasonController', function ($rootScope, $scope, $state, HSSeason, HSDeck, HSMatch, hearthStoneMatches, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        // Get Season
        HSSeason.get({ url: $state.params.url }, function (data)
        {
            $rootScope.title = data.title + '_My HearthStone Seasons';
            $scope.season = data;
        });

        // Get Season Matches
        $scope.$watch('season.month', function (newValue)
        {
            if (newValue) {
                HSMatch.get({ season: newValue }, function (data) {
                    $scope.matches = data.list;
                });
            }
        });

        // Get Season Decks
        $scope.$watch('matches', function (newValue)
        {
            if (newValue.length > 0) {
                var ids = hearthStoneMatches.getMatchDecks(newValue);

                HSDeck.query({ ids: ids.join() }, function (data) {
                    $scope.decks = {};
                    angular.forEach(data, function (value) {
                        $scope.decks[value._id] = value;
                    });
                });
            }
        });

        // Format Season Matches
        $scope.$watch('decks', function (newValue)
        {
            if (newValue) {
                $scope.deckTotalStats = {};
                $scope.deckDetailStats = {};
                $scope.seasonDetailStats = {};
                angular.forEach(newValue, function (value)
                {
                    var deckMatches = hearthStoneMatches.getMatchesByDeck(value._id, $scope.matches);
                    $scope.deckTotalStats[value._id] = {
                        win: hearthStoneMatches.getMatchesByResult(1, deckMatches).length,
                        lose: hearthStoneMatches.getMatchesByResult(0, deckMatches).length
                    };

                    var detail = {};
                    angular.forEach(HS_PLAYER_CLASSES, function (item)
                    {
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
    .controller('hsDeckController', function ($rootScope, $scope, $state, $filter, HSDeck, HSSeason, HSMatch, hearthStoneMatches, HS_PLAYER_CLASSES) {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        // Get Deck
        HSDeck.get({id: $state.params.id}, function (data)
        {
            $scope.deck = data;
            var cards = {};
            angular.forEach(data.cards, function (value)
            {
                if (Object.keys(cards).indexOf(value._id) < 0) {
                    cards[value._id] = {
                        card: value,
                        count: 1
                    };
                } else {
                    cards[value._id].count = 2;
                }
            });

            $scope.deck.cards = cards;
        });

        // Get Matches
        $scope.$watch('deck._id', function (newValue)
        {
            if (newValue) {
                HSMatch.get({ deck: newValue }, function (data)
                {
                    $scope.matches = data.list;
                });
            }
        });

        // Get Months
        $scope.$watch('matches', function (newValue)
        {
            if (newValue) {
                var months = [];
                angular.forEach(newValue, function (value)
                {
                    var month = $filter('date')(value.time, 'yyyyMM');
                    if (months.indexOf(month) < 0) {
                        months.push(month);
                    }
                });

                HSSeason.query({ months: months.join() }, function (data)
                {
                    $scope.seasons = data;
                });
            }
        });

        $scope.$watch('seasons', function (newValue)
        {
            if (newValue) {
                $scope.deckDetailStats = {};
                $scope.seasonDetailStats = {};
                $scope.seasonTotalStats = {};
                angular.forEach(newValue, function (value)
                {
                    var month = $filter('date')(value.month, 'yyyyMM');
                    var seasonMatches = hearthStoneMatches.getMatchesBySeason(month, $scope.matches);

                    $scope.seasonTotalStats[value._id] = {
                        win: hearthStoneMatches.getMatchesByResult(1, seasonMatches).length,
                        lose: hearthStoneMatches.getMatchesByResult(0, seasonMatches).length
                    };

                    var detail = {};
                    angular.forEach(HS_PLAYER_CLASSES, function (item)
                    {
                        var seasonOpponentMatches = hearthStoneMatches.getMatchesByOpponent(item.value, seasonMatches);
                        var deckOpponentMatches = hearthStoneMatches.getMatchesByOpponent(item.value, $scope.matches);

                        detail[item.value] = {
                            win: hearthStoneMatches.getMatchesByResult(1, seasonOpponentMatches).length,
                            lose: hearthStoneMatches.getMatchesByResult(0, seasonOpponentMatches).length
                        };

                        $scope.deckDetailStats[item.value] = {
                            win: hearthStoneMatches.getMatchesByResult(1, deckOpponentMatches).length,
                            lose: hearthStoneMatches.getMatchesByResult(0, deckOpponentMatches).length
                        };
                    });
                    $scope.seasonDetailStats[value._id] = detail;
                });

                $scope.deckTotalStats = {
                    win: hearthStoneMatches.getMatchesByResult(1, $scope.matches).length,
                    lose: hearthStoneMatches.getMatchesByResult(0, $scope.matches).length
                };
            }
        });
    })
    .service('hearthStoneMatches', function ($filter)
    {
        this.getMatchDecks = function (matches)
        {
            var ids = [];
            if (!matches) {
                return ids;
            }

            angular.forEach(matches, function (value)
            {
                if (ids.indexOf(value.deck_id) < 0)
                {
                    ids.push(value.deck_id);
                }
            });

            return ids;
        };

        this.getMatchesByDeck = function (id, matches)
        {
            function byDeck(id)
            {
                return function (value)
                {
                    return value.deck_id == id;
                };
            }

            return matches.filter(byDeck(id));
        };

        this.getMatchesByResult = function (result, matches)
        {
            function byResult(result)
            {
                if (result == 1) {
                    return function (value)
                    {
                        return value.result == result;
                    };
                } else {
                    return function (value)
                    {
                        return value.result != 1;
                    };
                }
            }

            return matches.filter(byResult(result));
        };

        this.getMatchesByOpponent = function (opponent, matches)
        {
            function byOpponent(opponent)
            {
                return function (value)
                {
                    return value.opponent == opponent;
                };
            }

            return matches.filter(byOpponent(opponent));
        };

        this.getMatchesBySeason = function (season, matches)
        {
            function bySeason(season)
            {
                return function (value)
                {
                    return $filter('date')(value.time, 'yyyyMM') == season;
                };
            }

            return matches.filter(bySeason(season));
        };

        return this;
    });