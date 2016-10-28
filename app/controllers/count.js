/**
 * Created by bill on 15/8/12.
 */

var async = require('async');
var games = require('../models/games');
var gourmets = require('../models/gourmets');
var hsSeasons = require('../models/hearthStone/seasons');
var hsMatches = require('../models/hearthStone/matches');
var hsDecks = require('../models/hearthStone/decks');

exports.get = function (req, res) {
    async.parallel([
        function (callback) {
            games.count(function(err, data)
            {
                if (err) {
                    callback(err)
                } else {
                    callback(null, {
                        table: 'Games',
                        count: data
                    });
                }
            });
        },
        function (callback) {
            gourmets.count(function(err, data)
            {
                if (err) {
                    callback(err)
                } else {
                    callback(null, {
                        table: 'Gourmets',
                        count: data
                    });
                }
            });
        },
        function (callback) {
            hsMatches.count(function(err, data)
            {
                if (err) {
                    callback(err)
                } else {
                    callback(null, {
                        table: 'Hearthstone Matches',
                        count: data
                    });
                }
            });
        },
        function (callback) {
            hsSeasons.count(function(err, data)
            {
                if (err) {
                    callback(err)
                } else {
                    callback(null, {
                        table: 'Hearthstone Seasons',
                        count: data
                    });
                }
            });
        },
        function (callback) {
            hsDecks.count(function(err, data)
            {
                if (err) {
                    callback(err)
                } else {
                    callback(null, {
                        table: 'Hearthstone Decks',
                        count: data
                    });
                }
            });
        }
    ], function (error, result) {
        if (error)
            throw error;

        console.log(result);
        res.json(result);
    })
};