/**
 * Created by bill on 15/8/18.
 */

var cardsController = angular.module('cardsController', []);

cardsController.controller('cardsController', function($scope, Card, Count)
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

        Card.query({ playerClass: index }, function(data)
        {
            $scope.classCards = data;
        });
    };

    $scope.getMoreCards = function(type, more, $event)
    {
        $event.preventDefault();

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
            } else if (more == 'next' && page < (Math.ceil(count.count / 8) - 1)) {
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
});