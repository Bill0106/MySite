/**
 * Created by bill on 15/9/17.
 */


exports.scrap = function(req, res)
{
    var game_id = req.params.id;

    var request = require('request');
    var url = req.body.url;

    request(url, function(error, response, body)
    {
        if (error)
            res.status(400).send(error);

        if (response.statusCode != 200)
            res.status(response.statusCode).send(body);

        scrapHtml(body, game_id, res);
    });
};

function scrapHtml(body, id, res)
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
            save(id, array, earned, res);
        }
    });
}

function save(id, data, earned, res)
{
    var trophies = require('../../models/trophies');
    var games = require('../../models/games');

    var trophy = new trophies();

    trophy.game_id = id;
    trophy.earned = earned;
    trophy.total = data.length;
    trophy.trophies = data;

    trophy.save(function(err)
    {
        if (err)
            res.status(500).send(err);

        games.findOne({ _id: id }, function(error, game)
        {
            if (error)
                res.status(500).send(error);

            game.trophies = trophy._id;

            game.save(function(gameError)
            {
                if (gameError)
                    res.status(500).send(gameError);

                res.send(trophy._id);
            });
        });
    });
}