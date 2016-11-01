/**
 * Created by bill on 16/5/7.
 */

var async    = require('async');
var moment   = require('moment');
var cheerio  = require('cheerio');
var request  = require('request');
var Trophies = require('../../models/trophies');
var Games    = require('../../models/games');

exports.find = function (req, res)
{
    Trophies.findOne({ _id: req.params.id }, function (error, data)
    {
        if (error)
            throw error;

        res.json(data);
    });
};

exports.create = function (req, res)
{
    async.waterfall([
        function (callback)
        {
            request(req.body.url, function(error, response, body)
            {
                if (error) {
                    callback(error);
                } else if (response.statusCode != 200) {
                    callback(body);
                } else {
                    callback(null, body);
                }
            });
        },
        function (body, callback)
        {
            var rarities = ['Bronze', 'Gold', 'Silver', 'Platinum'];
            var $ = cheerio.load(body);
            var items = $("div.element div.box table.zebra tr");

            var array = [];
            var earned = 0;
            async.each(items, function (value, eachCallback)
            {
                var titleElement = $("a.bold", value);
                var title = titleElement.text().trim();
                var titleLength = title.length;
                var text = titleElement.parent().text().trim();
                var rarity = $("center.gradient-separator img", value).attr('title');

                var date = '';
                if ($("span.typo-top-date", value).length > 0) {
                    date = moment($("span.typo-top-date", value).text().trim(), 'Do MMM YYYY').valueOf();
                    earned++;
                }

                var item = {
                    title: title,
                    description: text.substr(titleLength),
                    image: $("img.trophy_image", value).attr('src'),
                    rarity: rarities.indexOf(rarity),
                    date: date
                };

                array.push(item);
                eachCallback();
            }, function (error)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, array, earned);
                }
            });
        },
        function (data, earned, callback)
        {
            async.parallel([
                function (parallelCallback)
                {
                    var trophy = new Trophies();

                    trophy.game_id = req.params.id;
                    trophy.earned = earned;
                    trophy.total = data.length;
                    trophy.trophies = data;

                    trophy.save(function(error)
                    {
                        if (error) {
                            parallelCallback(error);
                        } else {
                            parallelCallback(null, trophy);
                        }
                    });
                },
                function (parallelCallback)
                {
                    Games.findOne({ _id: req.params.id }, function(error, game)
                    {
                        if (error) {
                            parallelCallback(error);
                        } else {
                            parallelCallback(null, game);
                        }
                    });
                }
            ], function (error, results)
            {
                if (error) {
                    callback(error);
                } else {
                    var game = results[1];
                    var trophy = results[0];

                    game.trophies = trophy._id;
                    game.save(function(err)
                    {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, trophy._id);
                        }
                    });
                }
            });
        }
    ], function (error, result)
    {
        if (error)
            throw error;

        res.send(result)
    });
};

exports.update = function (req, res)
{
    var trophies = req.body.trophies;
    var array = [];
    var earned = 0;

    async.each(req.body.trophies, function (item, callback)
    {
        if (item.date) {
            item.date = moment(item.date, 'YYYY-MM-DD').valueOf();
            earned++;
        }

        array.push(item);
        callback();
    }, function (error)
    {
        if (error)
            throw error;

        Trophies.findOne({ _id: req.body.id }, function (err, data)
        {
            if (err)
                throw err;

            data.total = array.length;
            data.earned = earned;
            data.trophies = array;

            data.save( function(saveError)
            {
                var result = {
                    "success": true,
                    "msg": data._id
                };

                if (saveError) {
                    result = {
                        "success": false,
                        "msg": error
                    }
                }

                res.json(result);
            });
        });
    });
};