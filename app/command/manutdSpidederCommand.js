/**
 * Created by Bill on 14-11-20.
 */

var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var database = require('../../config/database');

var leagueTable = require('../model/manutd/leagueTable');
var playerProfile = require('../model/manutd/playerProfile');
var playerStats = require('../model/manutd/playerStats');

// Update League Table
var updateLeagueTable = function(callback)
{
    var jar = request.jar();
    var cookie = request.cookie('pllocale=en_GB');
    var url = 'http://www.premierleague.com/en-gb/matchday/league-table.html';
    var count = 0;

    jar.setCookie(cookie, url);
    request({
        url: url,
        method: 'GET',
        jar: jar
    }, function(error, response, body)
    {
        if (error)
            throw error;

        if (response.statusCode !== 200)
            throw response.statusCode;

        var $ = cheerio.load(body);

        $("table.leagueTable tr.club-row").each(function()
        {
            var data = [];
            data['club'] = $(this).children('td.col-club').text();
            data['played'] = $(this).children('td.col-p').text();
            data['won'] = $(this).children('td.col-w').text();
            data['drawn'] = $(this).children('td.col-d').text();
            data['lost'] = $(this).children('td.col-l').text();
            data['for'] = $(this).children('td.col-gf').text();
            data['against'] = $(this).children('td.col-ga').text();
            data['difference'] = $(this).children('td.col-gd').text();
            data['points'] = $(this).children('td.col-pts').text();

            leagueTable.findOne({ club: data['club'] }, function(err, club)
            {
                if (err)
                    throw err;

                if (!club) {
                    club = new leagueTable();
                    club.club = data['club'];
                }

                club.played = data['played'];
                club.won = data['won'];
                club.drawn = data['drawn'];
                club.lost = data['lost'];
                club.for = data['for'];
                club.against = data['against'];
                club.difference = data['difference'];
                club.points = data['points'];

                club.save(function(err)
                {
                    if (err)
                        throw err;

                    count++;
                    if (count == 20) {
                        callback(null, 'League Table Updated!');
                    }
                });
            });
        });
    });
};

// Update Player Stats
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
                if (count == statsRow.length - 1) {
                    callback();
                }
            });
        }
    });
};

var updatePlayerStats = function(callback)
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
                if (count == profiles.length - 1) {
                    callback(null, 'Player Stats Update!');
                }
            });
        }
    });
};

// MongoDB Connect
mongoose.connect(database.url);
mongoose.set('debug', true);

// Code Execute
async.parallel([updateLeagueTable, updatePlayerStats], function(err, results)
{
    console.log(results);
    process.exit();
});