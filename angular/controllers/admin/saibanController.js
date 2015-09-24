/**
 * Created by bill on 15/9/23.
 */

angular.module('saibanAdmin', [])
    .controller('saibanGamesController', function($scope, saibanGame, SAIBAN_PLATFORM, SAIBAN_SERIES)
    {
        $scope.platforms = SAIBAN_PLATFORM;
        $scope.serieses = SAIBAN_SERIES;

        saibanGame.query(function(data)
        {
            $scope.games = data;
        });
    })
    .controller('saibanGameCreateController', function($scope, $state, $filter, saibanGame, SAIBAN_PLATFORM, SAIBAN_SERIES)
    {
        $scope.platforms = SAIBAN_PLATFORM;
        $scope.serieses = SAIBAN_SERIES;

        $scope.fields = ['order', 'image', 'release_at'];
        $scope.game = new saibanGame();
        $scope.game.chapters = [];

        $scope.addChapter = function()
        {
            var newChapter = {
                title: '',
                description: ''
            };

            $scope.game.chapters.push(newChapter);
        };

        $scope.saveGame = function()
        {
            $scope.game.$save(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('saibanGames');
                }
            });
        };
    })
    .controller('saibanGameUpdateController', function($scope, $state, $filter, saibanGame, SAIBAN_PLATFORM, SAIBAN_SERIES)
    {
        $scope.platforms = SAIBAN_PLATFORM;
        $scope.serieses = SAIBAN_SERIES;

        $scope.fields = ['order', 'image', 'release_at'];

        $scope.addChapter = function()
        {
            var newChapter = {
                title: '',
                description: ''
            };

            $scope.game.chapters.push(newChapter);
        };

        $scope.saveGame = function()
        {
            $scope.game.$update(function(data)
            {
                if (!data.success) {
                    $scope.show = true;
                    $scope.result = data.msg;
                } else {
                    $state.go('saibanGames');
                }
            });
        };

        $scope.loadGame = function()
        {
            $scope.game = saibanGame.get({ url: $state.params.url });

            $scope.$watch('game.release_at', function(date)
            {
                if (date) {
                    $scope.game.release_at = $filter('date')(date, 'yyyy-MM-dd');
                }
            });
        };

        $scope.loadGame();
    });