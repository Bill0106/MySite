/**
 * Created by bill on 15/8/21.
 */

var wins = require('../../models/hearthStone/wins');

exports.list = function(req, res)
{
    wins.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    wins.findOne({ _id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        var detail = [];

        data.detail.forEach(function(element, index, array)
        {
            detail[element.class] = {
                win: element.win,
                total: element.total
            };

            if (detail.length == data.detail.length) {
                data.detail = detail;
                res.json(data);
            }
        });
    });
};

exports.search = function(req, res)
{
    wins.find({ season_id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var total = 0;
    var win = 0;
    var count = 0;

    Object.keys(req.body.detail).forEach(function(element, index, array)
    {
        total += parseInt(req.body.detail[element].total);
        win += parseInt(req.body.detail[element].win);
        count++;

        if (count == Object.keys(req.body.detail).length) {
            var rate = new wins();

            rate.season_id = req.body.season_id;
            rate.deck_id = req.body.deck_id;
            rate.detail = req.body.detail;
            rate.overall = {
                win: win,
                total: total
            };

            rate.save(function(error)
            {
                var result = {
                    "success": true,
                    "msg": rate._id
                };

                if (error) {
                    result = {
                        "success": false,
                        "msg": error
                    }
                }

                res.json(result);
            });
        }
    });
};

exports.update = function(req, res)
{
    wins.findOne({ _id: req.body._id }, function(err, data)
    {
        if (err)
            res.send(err);

        var total = 0;
        var win = 0;
        var count = 0;

        Object.keys(req.body.detail).forEach(function(element, index, array)
        {
            total += parseInt(req.body.detail[element].total);
            win += parseInt(req.body.detail[element].win);
            count++;

            if (count == Object.keys(req.body.detail).length) {
                data.season_id = req.body.season_id;
                data.deck_id = req.body.deck_id;
                data.detail = req.body.detail;
                data.overall = {
                    win: win,
                    total: total
                };

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
            }
        });
    });
};