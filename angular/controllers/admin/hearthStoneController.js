/**
 * Created by bill on 15/8/20.
 */

angular.module('hearthStoneAdmin', [])
    .controller('hsDecksController', function($scope, HSDeck)
    {
        $scope.decks = HSDeck.query();
    });