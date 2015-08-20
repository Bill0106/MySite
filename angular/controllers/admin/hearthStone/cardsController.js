/**
 * Created by bill on 15/8/18.
 */

var cardsController = angular.module('cardsController', []);

cardsController.controller('cardsController', function($scope, HSCard, Count)
{
    $scope.playerClass = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];

    $scope.neutralPage = 0;
    $scope.classPage = 0;

    Card.query(function(data)
    {
        $scope.neutralCards = data;
    });

    $scope.getClassCards = function(index)
    {
        $scope.selectedClass = index;
        $scope.classPage = 0;

        Card.query({ playerClass: index }, function(data)
        {
            $scope.classCards = data;
        });
    };

    $scope.getMoreCards = function(type, more)
    {
        var playerClass = -1;
        var page = $scope.neutralPage;
        if (type == 'class') {
            playerClass = $scope.selectedClass;
            page = $scope.classPage;
        }

        Count.get({ model: 'cards', playerClass: playerClass}, function(count)
        {
            if (more == 'prev' && page !== 0) {
                page -= 1;
            } else if (more == 'next' && page < (Math.ceil(count.count / 12) - 1)) {
                page += 1;
            } else {
                return false;
            }

            Card.query({ playerClass: playerClass, offset: page }, function(data)
            {
                if (type == 'class') {
                    $scope.classCards = data;
                    $scope.classPage = page;
                } else {
                    $scope.neutralCards = data;
                    $scope.neutralPage = page;
                }
            });
        });
    };

    $scope.deckCards = [];
    $scope.addCard = function(card)
    {
        if ($scope.deckCards.length > 1) {
            if (checkCard(card, $scope.deckCards)) {
                $scope.deckCards.push(card);
            }
        } else {
            $scope.deckCards.push(card);
        }
    };

    function checkCard(item, object)
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
    }
});