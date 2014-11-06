/**
 * Created by Bill on 14-11-6.
 */

var Gourmet = require('../model/gourmet');

exports.list = function(req, res)
{
    Gourmet.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.post = function(req, res)
{
    Gourmet.create({
        food       : req.body.food,
        restaurant : req.body.restaurant,
        image      : req.body.image,
        url        : req.body.url
    }, function(err)
    {
        if (err)
            throw err;

        res.send(req.body.food);
    });
};