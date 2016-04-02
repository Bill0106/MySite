/**
 * Created by bill on 16/3/26.
 */

var async = require('async');
var Matches = require('../../models/hearthStone/matches');
var Decks = require('../../models/hearthStone/decks');
var moment = require('moment');

exports.list = function(req, res)
{
    var page = 1;
    if (req.query.page) {
        page = req.query.page;
    }

    async.parallel([
            function(callback)
            {
                var limit = 50;
                if (req.query.limit) {
                    limit = req.query.limit;
                }

                var offset = limit * (page - 1);

                Matches.find().limit(limit).skip(offset).sort({ time: 'desc' }).exec(function(err, data)
                {
                    if (err)
                        throw err;

                    callback(null, data);
                })
            },
            function(callback)
            {
                Decks.find(function(err, data)
                {
                    if (err)
                        throw err;

                    var count = 0;
                    var array = [];
                    for (var i = 0; i < data.length; i++) {
                        array[data[i]._id] = data[i].name;
                        count++;

                        if (count == data.length) {
                            callback(null, array);
                        }
                    }
                });
            },
            function(callback)
            {
                Matches.count(function(err, data)
                {
                    if (err)
                        throw err;

                    callback(null, data);
                });
            }
        ],
        function(err, results)
        {
            var array = [];
            var matches = results[0];
            var decks = results[1];
            for (var i = 0; i < matches.length; i++) {
                var data = {
                    _id: matches[i]._id,
                    deck: decks[matches[i].deck_id],
                    time: matches[i].time,
                    opponent: matches[i].opponent,
                    result: matches[i].result
                };

                array.push(data);
                if (array.length == matches.length) {
                    res.json({
                        success: true,
                        data: {
                            list: array,
                            total: results[2],
                            currentPage: page
                        }
                    });
                }
            }
        });
};

exports.create = function(req, res)
{
    var match = new Matches();

    match.deck_id = req.body.deck;
    match.opponent = parseInt(req.body.opponent);
    match.result = req.body.result;
    match.time = moment().valueOf();

    match.save(function(err)
    {
        var result = {};

        if (err) {
            result = {
                success: false,
                errorMsg: err
            };
        } else {
            result = {
                success: true,
                data: match
            };
        }

        res.json(result);
    });
};

exports.delete = function(req, res)
{
    Matches.remove({ _id: req.query.id }, function(err)
    {
        if (err) {
            res.json({
                success: false,
                errorMsg: err
            })
        }

        res.json({
            success: true
        })
    });
};
