/**
 * Created by bill on 15/8/19.
 */

var seasons = require('../../models/hearthStone/seasons');

exports.list = function(req, res)
{
    seasons.find().exce(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    console.log(req);
};