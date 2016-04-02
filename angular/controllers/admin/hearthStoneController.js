/**
 * Created by bill on 15/8/20.
 */

angular.module('hearthStoneAdmin', [])
    .controller('hsDecksController', function($scope, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.decks = HSDeck.query();
    })
    .controller('hsDeckCreateController', function($scope, $state, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.deck = new HSDeck();

        $scope.saveDeck = function()
        {
            $scope.deck.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSdecks');
                }
            });
        };
    })
    .controller('hsDeckUpdateController', function($scope, $state, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;

        $scope.saveDeck = function()
        {
            $scope.deck.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSdecks');
                }
            });
        };

        $scope.loadDeck = function()
        {
            $scope.deck = HSDeck.get({ id: $state.params.id });
        };

        $scope.loadDeck();
    })
    .controller('hsCardAddController', function($scope, $state, $filter, HSCard, HSDeck, Count, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.neutralPage = 0;
        $scope.classPage = 0;

        HSCard.query(function(data)
        {
            $scope.neutralCards = data;
        });

        $scope.deck = HSDeck.get({ id: $state.params.deck_id }, function(data)
        {
            $scope.deckCards = [];
            if (data.cards) {
                angular.forEach(data.cards, function(item)
                {
                    $scope.deckCards.push(item.card);
                    if (item.count === 2) {
                        $scope.deckCards.push(item.card);
                    }
                });
            }

            HSCard.query({ playerClass: data.playerClass }, function(cards)
            {
                $scope.classCards = cards;
            });
        });

        $scope.getMoreCards = function(type, more)
        {
            var page = $scope.neutralPage;
            if (type != -1) {
                page = $scope.classPage;
            }

            Count.get({ model: 'cards', playerClass: type}, function(count)
            {
                if (more == 'prev' && page !== 0) {
                    page -= 1;
                } else if (more == 'next' && page < (Math.ceil(count.count / 12) - 1)) {
                    page += 1;
                } else {
                    return false;
                }

                HSCard.query({ playerClass: type, offset: page }, function(data)
                {
                    if (type != -1) {
                        $scope.classCards = data;
                        $scope.classPage = page;
                    } else {
                        $scope.neutralCards = data;
                        $scope.neutralPage = page;
                    }
                });
            });
        };

        $scope.addCard = function(card)
        {
            if ($scope.deckCards.length > 1) {
                if ($filter('checkCard')(card, $scope.deckCards)) {
                    $scope.deckCards.push(card);
                }
            } else {
                $scope.deckCards.push(card);
            }
        };
        $scope.removeCard = function(card)
        {
            $scope.deckCards.splice($scope.deckCards.indexOf(card), 1);
        };

        $scope.addCards = function(deck, cards)
        {
            deck.cards = cards;
            deck.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSdecks');
                }
            });
        };
    })
    .controller('hsSeasonsController', function($scope, HSSeason, HSDeck)
    {
        $scope.seasons = HSSeason.query();

        $scope.decks = [];
        HSDeck.query(function(data)
        {
            angular.forEach(data, function(deck)
            {
                $scope.decks[deck._id] = deck;
            });
        });
    })
    .controller('hsSeasonCreateController', function($scope, $state, HSSeason, HSDeck)
    {
        $scope.fields = ['title', 'month', 'rank', 'image'];
        $scope.season = new HSSeason();
        $scope.decks = HSDeck.query();
        $scope.season.decks = [];

        $scope.selectDeck = function(id)
        {
            if ($scope.season.decks.indexOf(id) < 0) {
                $scope.season.decks.push(id);
            } else {
                $scope.season.decks.splice($scope.season.decks.indexOf(id), 1);
            }
        };

        $scope.saveSeason = function()
        {
            $scope.season.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSseasons');
                }
            });
        };
    })
    .controller('hsSeasonUpdateController', function($scope, $state, $filter, HSSeason, HSDeck)
    {
        $scope.fields = ['title', 'month', 'rank', 'image'];
        $scope.decks = HSDeck.query();

        $scope.selectDeck = function(id)
        {
            if ($scope.season.decks.indexOf(id) < 0) {
                $scope.season.decks.push(id);
            } else {
                $scope.season.decks.splice($scope.season.decks.indexOf(id), 1);
            }
        };

        $scope.saveSeason = function()
        {
            $scope.season.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSseasons');
                }
            });
        };

        $scope.loadSeason = function()
        {
            $scope.season = HSSeason.get({ url: $state.params.url });

            $scope.$watch('season.month', function(newValue)
            {
                if (newValue) {
                    $scope.season.month = $filter('date')(newValue, 'yyyy-MM');
                }
            });
        };

        $scope.loadSeason();
    })
    .controller('hsWinsController', function($scope, HSWin, HSDeck, HSSeason)
    {
        $scope.wins = HSWin.query();

        $scope.decks = [];
        HSDeck.query(function(data)
        {
            angular.forEach(data, function(deck)
            {
                $scope.decks[deck._id] = deck;
            });
        });

        $scope.seasons = [];
        HSSeason.query(function(data)
        {
            angular.forEach(data, function(season)
            {
                $scope.seasons[season._id] = season;
            });
        });
    })
    .controller('hsWinCreateController', function($scope, $state, HSWin, HSSeason, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.seasons = HSSeason.query();
        $scope.decks = HSDeck.query();
        $scope.win = new HSWin();

        $scope.saveWin = function()
        {
            $scope.win.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSWins');
                }
            });
        };
    })
    .controller('hsWinUpdateController', function($scope, $state, HSWin, HSSeason, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.seasons = HSSeason.query();
        $scope.decks = HSDeck.query();

        $scope.saveWin = function()
        {
            $scope.win.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('HSWins');
                }
            });
        };

        $scope.loadWin = function()
        {
            HSWin.get({ id: $state.params.id }, function(data)
            {
                $scope.win = data;
                $scope.win.detail = data.detail[0];
            });
        };

        $scope.loadWin();
    })
    .controller('hsMatchesController', function($scope, $stateParams, HSMatch, HS_PLAYER_CLASSES)
    {
        var limit = 50;
        var page = parseInt($stateParams.page) ? parseInt($stateParams.page) : 1;
        HSMatch.get({ page: page }, function(data)
        {
            if (data.success) {
                $scope.matches = data.data.list;

                var total = data.data.total;
                $scope.totalPage = new Array(Math.ceil(total / limit));
                $scope.currentPage = data.data.currentPage;
            }
        });
        $scope.playerClasses = HS_PLAYER_CLASSES;
    })
    .controller('hsMatchCreateController', function($scope, HSDeck, HSMatch, HS_PLAYER_CLASSES)
    {
        $scope.match = new HSMatch();

        $scope.matches = [];
        $scope.decks = HSDeck.query();
        $scope.playerClasses = HS_PLAYER_CLASSES;

        $scope.saveMatch = function(result)
        {
            $scope.match.result = result;

            $scope.match.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.data.errorMsg;
                } else {
                    $scope.matches.push(data.data);
                }
            });
        }
    })
    .filter('checkCard', function()
    {
        return function checkCard(item, object)
        {
            var count = 0;
            for (var i = 0; i < object.length; i++) {
                if (item._id == object[i]._id) {
                    count++;
                }
                if (count == 2) {
                    return false;
                }
            }
            return true;
        };
    })
    .directive('ngCards', function()
    {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs)
            {
                $("a").click(function(e)
                {
                    e.preventDefault();
                });
            }
        };
    });
