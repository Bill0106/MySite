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

        if (data.cards && data.cards.length > 1) {
            var cardsData = data.cards;
            var ids = [];
            var format = [];
            var count = 0;

            cardsData.forEach(function(element, index, array)
            {
                format[element.card] = element.count;
                ids.push(element.card);

                count++;

                if (count == array.length) {
                    cards.find({ _id: { $in: ids } }).sort({
                        cost: 'asc',
                        name: 'asc'
                    }).exec(function(error, cards)
                    {
                        var array = [];

                        cards.forEach(function(ele, ind, arr)
                        {
                            var item = {
                                card: ele,
                                count: format[ele._id]
                            };

                            array.push(item);
                            if (array.length == arr.length) {
                                data.cards = array;

                                res.json(data);
                            }
                        });
                    });
                }
            });
        } else {
            res.json(data);
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
    var cardsArray = req.body.cards;
    var cards = [];
    var cardsData = [];
    var count = 0;

    cardsArray.forEach(function(element, index, array)
    {
        if (cardsData[element._id]) {
            cardsData[element._id] = 2;
        } else {
            cardsData[element._id] = 1;
        }

        count++;

        if (count == array.length) {
            var keys = Object.keys(cardsData);
            keys.forEach(function(ele, ind, arr)
            {
                var item = {
                    card: ele,
                    count: cardsData[ele]
                };

                cards.push(item);

                if (cards.length == arr.length) {
                    decks.findOne({ _id: req.params.id }, function(err, data)
                    {
                        data.name = req.body.name;
                        data.playerClass = req.body.playerClass;
                        data.cards = cards;
                        data.active = req.body.active;

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
                }
            });
        }
    });
};