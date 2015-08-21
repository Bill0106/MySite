/**
 * Created by bill on 15/8/19.
 */

var seasons = require('../../models/hearthStone/seasons');
var timestamp = require('../../libraries/timestamp');
var month = require('../../config/month');

exports.list = function(req, res)
{
    seasons.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    seasons.findOne({ url: req.params.url }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var ts = timestamp(req.body.month);
    var newTs = new Date(ts);

    var season = new seasons();

    season.title = req.body.title;
    season.rank = req.body.rank;
    season.image = req.body.image;
    season.month = ts;
    season.url = month[newTs.getMonth()].toLowerCase() + '-' + newTs.getFullYear() + '-' + req.body.title.toLowerCase().replace(/ /g, '-');
    season.decks = req.body.decks;

    season.save(function(error)
    {
        var result = {
            "success": true,
            "msg": season._id
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
    seasons.findOne({ _id: req.body._id }, function(err, data)
    {
        data.title = req.body.title;
        data.rank = req.body.rank;
        data.image = req.body.image;
        data.month = timestamp(req.body.month);
        data.url = req.body.url;
        data.decks = req.body.decks;

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