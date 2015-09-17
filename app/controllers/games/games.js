/**
 * Created by bill on 15/8/2.
 */

var games = require('../../models/games');
var gamesTrophies = require('../../models/trophies');
var timestamp = require('../../libraries/timestamp');
var moment = require('moment');

exports.list = function(req, res)
{
    var offset = 0;
    if (req.query.offset) {
        offset = req.query.offset;
    }

    var limit = 12;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    games.find().sort({ buy_at: 'desc' }).limit(limit).skip(offset).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    games.findOne({ url: req.params.url }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var game = new games();

    game.title       = req.body.title;
    game.name        = req.body.name;
    game.publisher   = req.body.publisher;
    game.developer   = req.body.developer;
    game.release_at  = timestamp(req.body.release_at);
    game.buy_at      = timestamp(req.body.buy_at);
    game.rate        = req.body.rate;
    game.image       = req.body.image;
    game.url         = req.body.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
    game.platform    = req.body.platform;
    game.genre       = req.body.genre;
    game.description = req.body.description;

    if (req.body.url) {
        game.url = req.body.url;
    }

    game.save(function(error)
    {
        var result = {
            "success": true,
            "msg": game._id
        };

        if (error) {
            result = {
                "success": false,
                "msg": error
            }
        }

        res.json(result);
    });
};

exports.update = function(req, res)
{
    games.findOne({ _id: req.body._id }, function(err, data)
    {
        data.title       = req.body.title;
        data.name        = req.body.name;
        data.publisher   = req.body.publisher;
        data.developer   = req.body.developer;
        data.release_at  = timestamp(req.body.release_at);
        data.buy_at      = timestamp(req.body.buy_at);
        data.rate        = req.body.rate;
        data.image       = req.body.image;
        data.url         = req.body.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
        data.platform    = req.body.platform;
        data.genre       = req.body.genre;
        data.description = req.body.description;

        if (req.body.url) {
            data.url = req.body.url;
        }

        data.save(function(error)
        {
            var result = {
                "success": true,
                "msg": data._id
            };

            if (error) {
                result = {
                    "success": false,
                    "msg": error
                }
            }

            res.json(result);
        });
    });
};

exports.findTrophy = function(req, res)
{
    gamesTrophies.findOne({ _id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.updateTrophy = function(req, res)
{
    var trophies = req.body.trophies;
    var format = [];
    var earned = 0;
    trophies.forEach(function(element, index, array)
    {
        if (element.date) {
            element.date = moment(element.date, 'YYYY-MM-DD').valueOf();
            earned++;
        }

        format.push(element);

        if (format.length == array.length) {
            trophies = format;

            gamesTrophies.findOne({ _id: req.body._id }, function(err, data)
            {
                if (err)
                    res.send(err);

                data.total = trophies.length;
                data.earned = earned;
                data.trophies = trophies;

                data.save(function(error)
                {
                    var result = {
                        "success": true,
                        "msg": data._id
                    };

                    if (error) {
                        result = {
                            "success": false,
                            "msg": error
                        }
                    }

                    res.json(result);
                });
            });
        }
    });
};