/**
 * Created by Bill on 14-11-27.
 */

var request = require('request');
var cheerio = require('cheerio');

var playerProfile = require('../model/manutd/playerProfile');
var playerStats = require('../model/manutd/playerStats');

var statsUpdate = function(player, data, callback)
{
    playerStats.findOne({ player_id: player })
        .where('competition')
        .equals(data['competition'])
        .exec(function(err, stats)
        {
            if (!stats) {
                stats = new playerStats();
                stats.player_id = player;
            }

            stats.competition = data['competition'];
            stats.team = data['team'];
            stats.starter = data['starter'];
            stats.sub = data['sub'];
            stats.goals = data['goals'];
            stats.assists = data['assists'];
            stats.shots = data['shots'];
            stats.targets = data['targets'];

            stats.save(function(err)
            {
                if (err)
                    throw err;

                callback();
            });
        });
};

var statsSpider = function(profile, callback)
{
    request(profile.stats_url, function(error, response, body)
    {
        if (error)
            throw error;

        if (response.statusCode !== 200)
            throw response.statusCode;

        var $ = cheerio.load(body);
        var table = $("#player-stats-2014 table tbody");
        var statsRow = table.children("tr[class != 'columns']");
        var count = 0;

        for (var j = 0; j < statsRow.length; j++) {
            var data = [];
            data['competition'] = statsRow.eq(j).children('td.comp').attr('title');
            data['team'] = statsRow.eq(j).children('td.team').text();
            data['starter'] = statsRow.eq(j).children('td.gs').text();
            data['sub'] = statsRow.eq(j).children('td.sb').text();
            data['goals'] = statsRow.eq(j).children('td.g').text();
            data['assists'] = statsRow.eq(j).children('td.a').text();
            data['shots'] = statsRow.eq(j).children('td.sh').text();
            data['target'] = statsRow.eq(j).children('td.sg').text();

            statsUpdate(profile.id, data, function()
            {
                count++;
                if (count == statsRow.length) {
                    callback();
                }
            });
        }
    });
};

function updatePlayerStats(callback)
{
    playerProfile.find(function(err, profiles)
    {
        if (err)
            throw err;

        var count = 0;
        for (var i = 0; i < profiles.length; i++) {
            var profile = profiles[i];

            statsSpider(profile, function(num)
            {
                count++;
                if (count == profiles.length) {
                    callback(null, 'Player Stats Update!');
                }
            });
        }
    });
}

module.exports = updatePlayerStats;