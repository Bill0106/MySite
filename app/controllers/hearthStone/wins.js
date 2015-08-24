/**
 * Created by bill on 15/8/21.
 */

var wins = require('../../models/hearthStone/wins');

exports.list = function(req, res)
{
    wins.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    wins.findOne({ _id: res.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    console.log(req,body);
};

exports.update = function(req, res)
{
    console.log(req,body);
};