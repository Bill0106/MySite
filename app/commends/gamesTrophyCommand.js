/**
 * Created by bill on 15/9/16.
 */

(function fire()
{
    var prompt = require('prompt');
    prompt.start();

    prompt.get(['url', 'id'], function(err, result)
    {
        if (err)
            console.log(err);

        requestHtml(result);
    });
})();

function requestHtml(data)
{
    var request = require('request');
    var url = data.url;

    request(url, function(error, response, body)
    {
        if (error)
            console.log(error);

        if (response.statusCode != 200)
            console.log(response.statusCode, body);

        console.log('URL Request Finish!');
        scrapHtml(body, data.id);
    });
}

function scrapHtml(body, id)
{
    var rarities = ['Bronze', 'Gold', 'Silver', 'Platinum'];

    var moment = require('moment');
    var cheerio = require('cheerio');
    var $ = cheerio.load(body);
    var items = $("div.element div.box table.zebra tr");

    var array = [];
    var earned = 0;
    items.each(function(i, element)
    {
        var titleElement = $("a.bold", $(this));
        var title = titleElement.text().trim();
        var titleLength = title.length;
        var text = titleElement.parent().text().trim();
        var rarity = $("center.gradient-separator img", $(this)).attr('title');

        if ($("span.typo-top-date", $(this)).length > 0) {
            var date = moment($("span.typo-top-date", $(this)).text().trim(), 'Do MMM YYYY').valueOf();
            earned++;
        } else {
            var date = '';
        }

        var item = {
            title: title,
            description: text.substr(titleLength),
            image: $("img.trophy_image", $(this)).attr('src'),
            rarity: rarities.indexOf(rarity),
            date: date
        };

        array.push(item);

        if (array.length == items.length) {
            console.log('Data Get Finish!');
            save(id, array, earned);
        }
    });
}

function save(id, data, earned)
{
    var mongoose = require('mongoose');
    var database = require('../config/database');
    var trophies = require('../models/trophies');
    var games = require('../models/games');

    mongoose.connect(database);

    var trophy = new trophies();

    trophy.game_id = id;
    trophy.earned = earned;
    trophy.total = data.length;
    trophy.trophies = data;

    trophy.save(function(err)
    {
        if (err)
            console.log(err);

        games.findOne({ _id: id }, function(error, game)
        {
            game.trophies = trophy._id;

            game.save(function(gameError)
            {
                if (gameError)
                    console.log(gameError);

                console.log('Data Saved!');
                process.exit();
            });
        });
    });
}