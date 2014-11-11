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
    var date = req.body.date;
    date = date.split("-");
    var newDate = date[1] + "/" + date[2] + "/" + date[0];
    var timestamp = new Date(newDate).getTime();

    Gourmet.create({
        food       : req.body.food,
        restaurant : req.body.restaurant,
        date       : timestamp,
        image      : req.body.image,
        url        : req.body.url
    }, function(err)
    {
        if (err)
            throw err;

        res.send(req.body.food);
    });
};