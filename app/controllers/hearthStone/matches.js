/**
 * Created by bill on 16/3/26.
 */

var async = require('async');
var Matches = require('../../models/hearthStone/matches');
var moment = require('moment');

exports.list = function(req, res)
{
    var query = Matches.find();
    if (req.query.season) {
        var startTime = moment(req.query.season, 'YYYYMM').startOf('month').startOf('day').valueOf();
        var endTime   = moment(req.query.season, 'YYYYMM').add(1, 'month').startOf('day').valueOf();

        query = query.where('time').gte(startTime).lt(endTime);
    }

    if (req.query.deck) {
        var month = moment().startOf('month').startOf('day').valueOf();
        query = query.where('deck_id').equals(req.query.deck).where('time').lt(month);
    }

    if (req.query.page) {
        var page   = req.query.page;
        var limit  = 100;
        var offset = limit * (page - 1);

        query = query.limit(limit).skip(offset);
    }

    async.parallel([
            function(callback)
            {
                query.sort({ time: 'desc' }).exec(function(err, data)
                {
                    if (err)
                        throw err;

                    callback(null, data);
                })
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
            res.json({
                list: results[0],
                total: results[1]
            });
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
    Matches.remove({ _id: req.params.id }, function(error)
    {
        if (error) {
            res.json({
                success: false,
                errorMsg: error
            })
        } else {
            res.json({
                success: true
            })
        }
    });
};
