/**
 * Created by Bill on 14-11-27.
 */

var request = require('request');
var cheerio = require('cheerio');
var timestamp = require('../../config/timestamp');
var matchFixture = require('../model/manutd/matchFixture');

var months = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12};
var date = function(time)
{
    var timeFormat = time.split(', ');
    var getDate = timeFormat[1].split(' ');
    var year = timeFormat[2];
    var month = months[getDate[0]];
    var day = getDate[1];
    var result = timestamp(year + '-' + month + '-' + day);

    return result;
};

var saveMatchFixtures = function(data, callback)
{
    matchFixture.findOne({competition: data['competition']})
        .where('location').equals(data['location'])
        .where('opponent').equals(data['opponent'])
        .exec(function(err, match)
        {
            if (err)
                throw err;

            if (!match) {
                match = new matchFixture();
                match.competition = data['competition'];
                match.location = data['location'];
                match.opponent = data['opponent'];
                match.game_id = data['id'];
            }

            match.time = data['time'];
            match.home = data['home'];
            match.away = data['away'];

            match.save(function(err)
            {
                if (err)
                    throw err;

                callback();
            });
        });
};

var requestHtml = function(url, callback)
{
    request(url, function(error, response, body)
    {
        if (error)
            throw error;

        if (response.statusCode !== 200)
            throw response.statusCode + url;

        var $ = cheerio.load(body);
        var scoreBox = $(".score-box");
        var count = 0;

        for (var i = 0; i < scoreBox.length; i++) {
            var $this = scoreBox.eq(i);
            var gameId = $(".score", $this).attr('data-gameid');
            var data = [];
            data['id'] = gameId;
            data['competition'] = $(".date-info span", $this).text();
            data['time'] = date($(".date-info strong", $this).text());

            var homeTeam = $(".team-name span", $this).eq(0).text();
            var awayTeam = $(".team-name span", $this).eq(1).text();

            if (homeTeam == 'Manchester United') {
                data['location'] = 0;
                data['opponent'] = awayTeam;
            } else {
                data['location'] = 1;
                data['opponent'] = homeTeam;
            }

            var homeScore = $(".team-score span", $this).eq(0).text();
            var awayScore = $(".team-score span", $this).eq(1).text();
            data['home'] = homeScore;
            data['away'] = awayScore;

            saveMatchFixtures(data, function()
            {
                count++;
                if (count == scoreBox.length) {
                    callback();
                }
            });
        }
    });
};

function updateMatchFixtures(callback)
{
    var count = 0;
    for (var i = 201407; i < 201506; i++) {
        if (i == 201413) {
            i = 201501
        }

        var url = 'http://www.espnfc.com/club/manchester-united/360/fixtures?date=' + i;

        requestHtml(url, function()
        {
            count++;
            if (count == 11) {
                callback(null, 'Match Fixtures Updated!');
            }
        });
    }
}

module.exports = updateMatchFixtures;