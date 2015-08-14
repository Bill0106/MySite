/**
 * Created by bill on 15/8/12.
 */

var games = require('../models/games');
var gourmets = require('../models/gourmets');

exports.games = function(req, res)
{
    games.count(function(err, data)
    {
        if (err)
            res.send(err);

        res.json({
            count: data
        });
    });
};

exports.gourmets = function(req, res)
{
    gourmets.count(function(err, data)
    {
        if (err)
            res.send(err);

        res.json({
            count: data
        });
    });
};