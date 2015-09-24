/**
 * Created by bill on 15/9/22.
 */

var games = require('../../models/saiban/games');
var moment = require('moment');

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
    var game = new games();

    game.series      = req.body.series;
    game.order       = req.body.order;
    game.platform    = req.body.platform;
    game.release_at  = moment(req.body.release_at, 'YYYY-MM-DD').valueOf();
    game.title       = req.body.title;
    game.image       = req.body.image;
    game.description = req.body.description;
    game.chapters    = req.body.chapters;

    switch (req.body.series) {
        case 1:
            game.url = 'gyakuten-saiban-' + req.body.order;
            break;
        case 2:
            game.url = 'da-gyakuten-ganji-' + req.body.order;
            break;
        case 3:
            game.url = 'da-gyakuten-saiban-' + req.body.order;
            break;
        default :
            game.url = 'gyakuten-saiban-' + req.body.order;
    }

    game.save(function(error)
    {
        var result = {
            "success": true,
            "msg": game._id
        };

        if (error) {
            result = {
                "success": false,
                "msg": error
            }
        }

        res.json(result);
    });
};

exports.update = function(req, res)
{
    games.findOne({ _id: req.body._id }, function(err, game)
    {
        game.series      = req.body.series;
        game.order       = req.body.order;
        game.platform    = req.body.platform;
        game.release_at  = moment(req.body.release_at, 'YYYY-MM-DD').valueOf();
        game.title       = req.body.title;
        game.image       = req.body.image;
        game.description = req.body.description;
        game.chapters    = req.body.chapters;
        game.url         = req.body.url;


        game.save(function(error)
        {
            var result = {
                "success": true,
                "msg": game._id
            };

            if (error) {
                result = {
                    "success": false,
                    "msg": error
                }
            }

            res.json(result);
        });
    });
};