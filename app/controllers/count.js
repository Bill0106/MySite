/**
 * Created by bill on 15/8/12.
 */

var games = require('../models/games');

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