/**
 * Created by bill on 15/8/2.
 */

var async  = require('async');
var moment = require('moment');
var Games  = require('../../models/games');

exports.list = function (req, res)
{
    async.parallel([
        function (callback)
        {
            var limit  = req.query.limit ? req.query.limit : 30;
            var page   = req.query.page ? parseInt(req.query.page) : 1;
            var offset = limit * (page - 1);

            Games.find().limit(parseInt(limit)).skip(offset).sort({ buy_at: 'desc' }).exec(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        item.title = new Buffer(item.title, 'base64').toString();
                        eachCallback();
                    }, function(err)
                    {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, data);
                        }
                    });
                }
            });
        },
        function (callback)
        {
            Games.count(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, data);
                }
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

        data.title = new Buffer(data.title, 'base64').toString();

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var game = new Games();

    game.title       = new Buffer(req.body.title).toString('base64');
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
    Games.findOne({ _id: req.body.id }, function(err, data)
    {
        data.title       = new Buffer(req.body.title).toString('base64');
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