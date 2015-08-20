/**
 * Created by bill on 15/8/19.
 */

var decks = require('../../models/hearthStone/decks');

exports.list = function(req, res)
{
    decks.find().exec(function(err, data)
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