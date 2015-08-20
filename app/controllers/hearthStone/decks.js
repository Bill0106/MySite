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

exports.find = function(req, res)
{
    decks.findOne({ _id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var deck = new decks();

    deck.name = req.body.name;
    deck.playerClass = req.body.playerClass;

    deck.save(function(error)
    {
        var result = {
            "success": true,
            "msg": deck._id
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
    decks.findOne({ _id: req.params.id }, function(err, data)
    {
        data.name = req.body.name;
        data.playerClass = req.body.playerClass;

        data.save(function(error)
        {
            var result = {
                "success": true,
                "msg": data._id
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