/**
 * Created by bill on 15/8/20.
 */

angular.module('hearthStoneAdmin', [])
    .controller('hsDecksController', function($scope, HSDeck, HS_PLAYER_CLASSES)
    {
        $scope.playerClasses = HS_PLAYER_CLASSES;
        $scope.decks = HSDeck.query();
    })
    .controller('hsDeckCreateController', function($scope, $state, $filter, HSDeck, HSCard)
    {
        $scope.deck = new HSDeck();
        $scope.deck.playerClass = $state.params.class;
        $scope.deck.cards = [];

        $scope.classCards = HSCard.query({ playerClass: $state.params.class });
        $scope.neutralCards = HSCard.query({ playerClass: -1 });

        $scope.getCardByCost = function(cost, event)
        {
            event.preventDefault();
            HSCard.query({ playerClass: -1, cost: cost }, function(data)
            {
                $scope.neutralCards = data;
            });
        };

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        $scope.addCard = function(card)
        {
            if ($filter('checkCard')(card, $scope.deck.cards)) {
                $scope.deck.cards.push(card);
            }
        };

        $scope.removeCard = function(card, event)
        {
            event.preventDefault();
            $scope.deck.cards.splice($scope.deck.cards.indexOf(card), 1);
        };

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
    .controller('hsDeckUpdateController', function($scope, $state, $filter, HSDeck, HSCard)
    {
        $scope.loadDeck = function()
        {
            HSDeck.get({ id: $state.params.id }, function(data)
            {
                $scope.deck = data;

                $scope.classCards = HSCard.query({ playerClass: data.playerClass });
            });

        };

        $scope.loadDeck();

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

        $scope.neutralCards = HSCard.query({ playerClass: -1 });
        $scope.getCardByCost = function(cost, event)
        {
            event.preventDefault();
            HSCard.query({ playerClass: -1, cost: cost }, function(data)
            {
                $scope.neutralCards = data;
            });
        };

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        $scope.addCard = function(card)
        {
            if ($filter('checkCard')(card, $scope.deck.cards)) {
                $scope.deck.cards.push(card);
            }
        };

        $scope.removeCard = function(card, event)
        {
            event.preventDefault();
            $scope.deck.cards.splice($scope.deck.cards.indexOf(card), 1);
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
    .controller('hsMatchesController', function($scope, $stateParams, HSMatch, HS_PLAYER_CLASSES)
    {
        var limit = 100;
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

        $scope.total = 0;
        $scope.win = 0;

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

                    $scope.total++;
                    if (data.data.result == 1) {
                        $scope.win++;
                    }
                }
            });
        };
    })
    .filter('checkCard', function()
    {
        return function checkCard(item, object)
        {
            if (object.length === 0) {
                return true;
            }

            if (object.length == 30) {
                return false;
            }

            var count = 0;
            for (var i = 0; i < object.length; i++) {
                if (item._id == object[i]._id) {
                    count++;
                }

                if (count == 1 && item.rarity == 4) {
                    return false;
                }

                if (count == 2) {
                    return false;
                }
            }
            return true;
        };
    });
