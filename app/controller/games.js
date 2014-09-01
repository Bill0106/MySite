/**
 * Created by Bill on 14-8-11.
 */

var Game = require('../model/game');

exports.list = function(req, res)
{
    Game.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data)
    });
};

exports.post = function(req, res)
{
    console.log(req.body);
    Game.create({
        title       : req.body.title,
        name        : req.body.name,
        platform    : req.body.platform.name,
        genre       : req.body.genre.name,
        company     : req.body.company,
        date        : req.body.date,
        rate        : req.body.rate,
        description : req.body.description,
        image       : req.body.image,
        url         : req.body.name.toLowerCase().replace(/ /g, '-').replace(/:/g, ''),
        done        : false
    }, function(err)
    {
        if (err)
            throw err;

        res.send(req.body.title);
    });
};