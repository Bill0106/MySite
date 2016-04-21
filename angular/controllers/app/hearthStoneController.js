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
                    hearthStoneMatches.addMatches(data.list);
                });
            }
        });

        // Get Season Decks
        $scope.$watch(function()
        {
            return hearthStoneMatches.getMatches();
        }, function (newValue)
        {
            if (newValue.length > 0) {
                var ids = hearthStoneMatches.getMatchDecks();

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
                $scope.stats = hearthStoneMatches.getMatchesStats('deck', $scope.decks);
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
                    hearthStoneMatches.addMatches(data.list);
                });
            }
        });

        // Get Months
        $scope.$watch(function ()
        {
            return hearthStoneMatches.getMatches();
        }, function (newValue)
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
                $scope.stats = hearthStoneMatches.getMatchesStats('season', $scope.seasons);
            }
        });
    })
    .service('hearthStoneMatches', function ($filter, HS_PLAYER_CLASSES)
    {
        this.matches = [];

        this.addMatches = function (matches)
        {
            this.matches = matches;
        };

        this.getMatches = function ()
        {
            return this.matches;
        };

        this.getMatchDecks = function ()
        {
            var ids = [];
            if (this.matches.length < 0) {
                return ids;
            }

            angular.forEach(this.matches, function (value)
            {
                if (ids.indexOf(value.deck_id) < 0) {
                    ids.push(value.deck_id);
                }
            });

            return ids;
        };

        this.getMatchSeasons = function ()
        {
            var months = [];
            if (this.matches.length < 0) {
                return months;
            }

            angular.forEach(this.matches, function (value)
            {
                var month = $filter('date')(value.time, 'yyyyMM');
                if (months.indexOf(month) < 0) {
                    months.push(month);
                }
            });

            return months;
        };

        this.getMatchesStats = function (filter, list)
        {
            var matches = this.matches;
            var main = {};
            main.total = {
                win: matches.filter(byResult(1)).length,
                lose: matches.filter(byResult(0)).length
            };

            main.detail = {};
            angular.forEach(HS_PLAYER_CLASSES, function (value)
            {
                main.detail[value.value] = {
                    win: matches.filter(byOpponent(value.value)).filter(byResult(1)).length,
                    lose: matches.filter(byOpponent(value.value)).filter(byResult(0)).length
                };
            });

            var array = {};
            angular.forEach(list, function (value)
            {
                var item = {};
                var filteredMatches = [];
                if (filter == 'deck') {
                    filteredMatches = matches.filter(byDeck(value._id));
                } else if (filter == 'season') {
                    filteredMatches = matches.filter(bySeason($filter('date')(value.month, 'yyyyMM')));
                }

                var detail = {};
                angular.forEach(HS_PLAYER_CLASSES, function (val)
                {
                    detail[val.value] = {
                        win: filteredMatches.filter(byOpponent(val.value)).filter(byResult(1)).length,
                        lose: filteredMatches.filter(byOpponent(val.value)).filter(byResult(0)).length
                    };
                });

                item.total = {
                    win: filteredMatches.filter(byResult(1)).length,
                    lose: filteredMatches.filter(byResult(0)).length
                };
                item.detail = detail;

                array[value._id] = item;
            });

            return {
                main: main,
                list: array
            };
        };

        function byDeck(id)
        {
            return function (value)
            {
                return value.deck_id == id;
            };
        }

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

        function byOpponent(opponent)
        {
            return function (value)
            {
                return value.opponent == opponent;
            };
        }

        function bySeason(season)
        {
            return function (value)
            {
                return $filter('date')(value.time, 'yyyyMM') == season;
            };
        }

        return this;
    });