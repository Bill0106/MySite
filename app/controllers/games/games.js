/**
 * Created by bill on 15/8/2.
 */

var async = require('async');
var Games = require('../../models/games');
var GamesTrophies = require('../../models/trophies');
var moment = require('moment');

exports.list = function (req, res)
{
    async.parallel([
        function (callback)
        {
            var query = Games.find();

            if (req.query.limit) {
                var limit = req.query.limit;
                query = query.limit(limit);
            }

            if (req.query.page && limit) {
                var page = parseInt(req.query.page);
                var offset = limit * (page - 1);
                query = query.skip(offset);
            }

            query.sort({ buy_at: 'desc' }).exec(function (error, data)
            {
                if (error)
                    callback(error);

                callback(null, data);
            });
        },
        function (callback)
        {
            Games.count(function (error, data)
            {
                if (error)
                    callback(error);

                callback(null, data);

            });
        }
    ], function (error, results)
    {
        if (error)
            throw error;

        res.json({
            list: results[0],
            total: results[1]
        });
    });
};

exports.find = function(req, res)
{
    Games.findOne({ url: req.params.url }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var game = new Games();

    game.title       = req.body.title;
    game.name        = req.body.name;
    game.publisher   = req.body.publisher;
    game.developer   = req.body.developer;
    game.release_at  = moment(req.body.release_at, 'YYYY-MM-DD').valueOf();
    game.buy_at      = moment(req.body.buy_at, 'YYYY-MM-DD').valueOf();
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
    Games.findOne({ _id: req.body._id }, function(err, data)
    {
        data.title       = req.body.title;
        data.name        = req.body.name;
        data.publisher   = req.body.publisher;
        data.developer   = req.body.developer;
        data.release_at  = moment(req.body.release_at, 'YYYY-MM-DD').valueOf();
        data.buy_at      = moment(req.body.buy_at, 'YYYY-MM-DD').valueOf();
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
    GamesTrophies.findOne({ _id: req.params.id }, function(err, data)
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