/**
 * Created by bill on 15/8/18.
 */

var cardsController = angular.module('cardsController', []);

cardsController.controller('cardsController', function($scope, Card)
{
    Card.query(function(data)
    {
        $scope.cards = data;
    });
});