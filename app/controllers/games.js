/**
 * Created by bill on 15/8/2.
 */

var games = require('../models/games');

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
    games.findOne({ url: req.params.game_url }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};