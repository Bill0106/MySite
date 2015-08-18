/**
 * Created by bill on 15/8/12.
 */

var games = require('../models/games');
var gourmets = require('../models/gourmets');
var cards = require('../models/hearthStone/cards');

exports.games = function(req, res)
{
    games.count(function(err, data)
    {
        if (err)
            res.send(err);

        res.json({
            count: data
        });
    });
};

exports.gourmets = function(req, res)
{
    gourmets.count(function(err, data)
    {
        if (err)
            res.send(err);

        res.json({
            count: data
        });
    });
};

exports.cards = function(req, res)
{
    var playerClass = -1;
    if (req.query.playerClass) {
        playerClass = req.query.playerClass;
    }

    cards.find({ playerClass: playerClass }).count(function(err, data)
    {
        if (err)
            res.send(err);

        res.json({
            count: data
        })
    });
};