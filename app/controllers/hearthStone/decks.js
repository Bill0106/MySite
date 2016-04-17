/**
 * Created by bill on 15/8/19.
 */

var decks = require('../../models/hearthStone/decks');
var cards = require('../../models/hearthStone/cards');
var async = require('async');

exports.list = function(req, res)
{
    var query = decks.find();

    if (req.query.active) {
        query.where('active').equals(true);
    }

    if (req.query.ids) {
        var ids = req.query.ids.split(',');
        query.where('_id').in(ids);
    }

    query.exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    async.waterfall([
        function(callback)
        {
            decks.findOne({ _id: req.params.id }, function(error, data)
            {
                if (error) {
                    callback(error);
                }

                callback(null, data);
            });
        },
        function(deck, callback)
        {
            if (!deck.cards || deck.cards.length == 0) {
                callback(null, deck, null);
            }

            var ids = {};
            async.each(deck.cards, function(item, eachCallback)
            {
                ids[item.card] = item.count;

                eachCallback();
            }, function()
            {
                callback(null, deck, ids);
            });
        },
        function(deck, ids, callback)
        {
            cards.find({ _id: { $in: Object.keys(ids) } }).sort({
                cost: 'asc',
                name: 'asc'
            }).exec(function(error, data)
            {
                if (error) {
                    callback(error);
                }

                var array = [];
                async.each(data, function(item, eachCallback)
                {
                    array.push(item);
                    if (ids[item._id] == 2) {
                        array.push(item);
                    }

                    eachCallback();
                }, function()
                {
                    callback(null, deck, array);
                });
            });
        }
    ], function(error, deck, cards)
    {
        if (error)
            throw error;


        deck.cards = cards;

        res.json(deck);
    });
};

exports.create = function(req, res)
{
    var deck = new decks();

    deck.name = req.body.name;
    deck.playerClass = req.body.playerClass;
    deck.active = req.body.active;

    _formatCards(req.body.cards, function(cards)
    {
        deck.cards = cards;

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
    });
};

exports.update = function(req, res)
{
    decks.findOne({ _id: req.params.id }, function(error, data)
    {
        data.name = req.body.name;
        data.playerClass = req.body.playerClass;
        data.active = req.body.active;

        _formatCards(req.body.cards, function(cards)
        {
            data.cards = cards;

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
    });
};

function _formatCards(cards, callback)
{
    async.waterfall([
        function(cb)
        {
            var data = [];
            async.each(cards, function(item, eachCallback)
            {
                if (data[item._id]) {
                    data[item._id] = 2;
                } else {
                    data[item._id] = 1;
                }

                eachCallback()
            }, function()
            {
                cb(null, data);
            });
        },
        function(result, cb)
        {
            var data = [];
            var keys = Object.keys(result);

            async.each(keys, function(item, eachCallback)
            {
                var value = {
                    card: item,
                    count: result[item]
                };

                data.push(value);
                eachCallback();
            }, function()
            {
                cb(null, data);
            });
        }
    ], function(error, data)
    {
        if (error)
            throw error;

        callback(data);
    });
}