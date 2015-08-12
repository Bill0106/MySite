/**
 * Created by bill on 15/8/2.
 */

var games = require('../models/games');
var timestamp = require('../libraries/timestamp');

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
    games.findOne({ url: req.params.game_url }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    games.findOne({ _id: req.body._id }, function(err, data)
    {
        if (!data) {
            data = new games();
        }

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
};;