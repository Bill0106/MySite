/**
 * Created by Bill on 14-9-10.
 */

var gameCtrl = angular.module('gameCtrl', []);

gameCtrl.controller('gameController', function($scope, $stateParams, Game)
{
    Game.get($stateParams.url).success(function(data)
    {
        $scope.imagePath = imagePath;

        $scope.game = data;

        $scope.descriptions = data.description.split("\n");
        $scope.rate = data.rate;

        var rateText = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];
        $scope.rateText = rateText[data.rate - 1];

        $scope.getDate = function(timestamp)
        {
            var newDate = new Date(parseInt(timestamp));
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var date = year + '.' + month + '.' + day;

            return date;
        };
    });
});

gameCtrl.directive('ngGame', ['$timeout', function(timer)
{
    return {
        restrict: 'A',
        scope: {
            rate: '=gameRate'
        },
        replace: true,
        link: function(scope, attr, element)
        {
            function drawRate(rate)
            {
                var bgCanvas = $("#rateBackground")[0];
                var bgContext = bgCanvas.getContext('2d');
                var alpha = 0;

                var drawBackground = setInterval(function()
                {
                    alpha += 0.05;
                    if (alpha > 1) {
                        clearInterval(drawBackground);
                    }

                    bgContext.clearRect(0, 0, 100, 100);
                    bgContext.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
                    bgContext.beginPath();
                    bgContext.arc(50, 50, 45, 0, Math.PI*2, true);
                    bgContext.closePath();
                    bgContext.fill();
                }, 50);

                setTimeout(function()
                {
                    bgContext.font = "Bold 50px Arial";
                    bgContext.textAlign = "center";
                    bgContext.fillStyle = "#ff0000";
                    bgContext.textBaseline = "middle";
                    bgContext.fillText(rate, 50, 50);
                }, 1100);

                var rateCanvas = $("#rate")[0];
                var rateContext = rateCanvas.getContext('2d');
                var degree = 0;

                var drawRateCircle = setInterval(function()
                {
                    degree++;
                    if (degree > (360 * rate / 5 - 90)) {
                        clearInterval(drawRateCircle);
                    }

                    rateContext.clearRect(0, 0, 100, 100);
                    rateContext.beginPath();
                    rateContext.arc(50, 50, 40, -(Math.PI * 0.5), (Math.PI / 180) * degree, false);
                    rateContext.lineWidth = 10.0;
                    rateContext.strokeStyle = '#ff0000';
                    rateContext.stroke();
                });
            }

            function gamePageLoading()
            {
                var pageLoading = $("[data-game='pageLoading']");
                var gameDetail = $("[data-game='detail']");
                var gameImage = $("[data-game='image']");
                var src = gameImage.attr('src');
                var image = new Image();

                $(image).attr('src', src).bind('load', function()
                {
                    pageLoading.dimmer('hide').removeClass('active');
                    gameDetail.transition('show');

                    setTimeout(drawRate(scope.rate), 300);
                });
            }

            timer(gamePageLoading, 500);
        }
    };
}]);