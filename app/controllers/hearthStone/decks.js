/**
 * Created by bill on 15/8/19.
 */

var decks = require('../../models/hearthStone/decks');
var cards = require('../../models/hearthStone/cards');

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

        if (data.cards[0]) {
            cards.find({ _id: { $in: data.cards[0].origin } }).exec(function(error_origin, cards_origin)
            {
                if (error_origin)
                    res.send(error_origin);

                cards.find({ _id: { $in: data.cards[0].extend } }).exec(function(error_extend, cards_extend)
                {
                    if (error_extend)
                        res.send(error_extend);

                    data.cards = cards_origin.concat(cards_extend);

                    res.json(data);
                });
            });
        }
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

        if (req.body.cards) {
            var cards = {
                    origin: [],
                    extend: []
            };
            for (var i = 0; i < req.body.cards.length; i++) {
                if (cards.origin.indexOf(req.body.cards[i]._id) < 0) {
                    cards.origin.push(req.body.cards[i]._id);
                } else {
                    cards.extend.push(req.body.cards[i]._id);
                }
            }
            data.cards = cards;
        }

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