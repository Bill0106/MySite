/**
 * Created by Bill on 14-11-27.
 */

var request = require('request');
var cheerio = require('cheerio');

var leagueTable = require('../model/manutd/leagueTable');

function updateLeagueTable(callback)
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
}

module.exports = updateLeagueTable;