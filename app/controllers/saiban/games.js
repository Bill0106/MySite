/**
 * Created by bill on 15/9/22.
 */

var games = require('../../models/saiban/games');

exports.list = function(req, res)
{
    games.find(function(err, data)
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
    console.log(req.body);
};

exports.update = function(req, res)
{
    console.log(req.body);
};