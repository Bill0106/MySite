/**
 * Created by Bill on 14-12-1.
 */

var request = require('request');
var cheerio = require('cheerio');
var matchScore = require('../model/manutd/matchScore');
var matchFixture = require('../model/manutd/matchFixture');

var saveMatchScores = function(data, callback)
{
    matchScore.findOne({ match_id: data['match_id'] })
        .where('time').equals(data['time'])
        .exec(function(err, score)
        {
            if (err)
                throw err;

            if (!score) {
                score = new matchScore;

                score.match_id = data['match_id'];
                score.time = data['time'];
                score.team = data['team'];
                score.player = data['player'];
                score.type = data['type'];

                score.save(function(err)
                {
                    if (err)
                        throw err;

                    callback();
                });
            } else {
                callback();
            }
        });
};

var requestScoreHtml = function(matchId, gameId, callback)
{
    var url = 'http://www.espnfc.co.uk/gamecast/statistics/id/' + gameId + '/statistics.html';

    request(url, function(error, response, body)
    {
        if (error)
            throw error;

        if (response.statusCode !== 200)
            throw response.statusCode + url;

        var $ = cheerio.load(body);
        var goalScorers = $(".team ul.goal-scorers li");

        if (goalScorers.length > 0) {
            var count = 0;
            for (var i = 0; i < goalScorers.length; i++) {
                var $this = goalScorers.eq(i);
                var timeArray = $this.children('strong').text().split('\'');
                var timeLength = timeArray.length;
                var data = [];
                data['match_id'] = matchId;

                if ($this.parents('div.team').hasClass('away')) {
                    data['team'] = 0;
                } else {
                    data['team'] = 1;
                }

                if (timeArray[timeLength - 1].trim().length > 0 && timeArray[timeLength - 1].trim() == 'PEN') {
                    data['type'] = 1;
                } else if (timeArray[timeLength - 1].trim().length > 0 && timeArray[timeLength - 1].trim() == 'OG') {
                    data['type'] = -1;
                } else {
                    data['type'] = 0;
                }

                if (parseInt(timeArray[0].trim()) == 90 && timeArray[1].trim().length > 0) {
                    var extraTime = parseInt(timeArray[1].trim());
                    data['time'] = parseInt(timeArray[0].trim()) + extraTime;
                } else {
                    data['time'] = parseInt(timeArray[0].trim());
                }

                $this.children().remove();
                data['player'] = $this.text().trim();

                saveMatchScores(data, function()
                {
                    count++;
                    if (count == goalScorers.length) {
                        callback();
                    }
                });
            }
        } else {
            callback();
        }
    });
};

function updateMatchScores(callback)
{
    var d = new Date();
    var now = d.getTime();

    matchFixture.find().where('time').lt(now).exec(function(error, matches)
    {
        if (error)
            throw error;

        var count = 0;

        for (var i = 0; i < matches.length; i++) {
            var gameId = matches[i].game_id;
            var matchId = matches[i].id;

            requestScoreHtml(matchId, gameId, function()
            {
                count++;
                if (count == matches.length) {
                    callback(null, 'Match Scores Updated!');
                }
            })
        }
    });
}

module.exports = updateMatchScores;