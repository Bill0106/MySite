/**
 * Created by bill on 15/8/13.
 */

var gourmets = require('../models/gourmets');
var timestamp = require('../libraries/timestamp');

exports.list = function(req, res)
{
    var offset = 0;
    if (req.query.offset) {
        offset = req.query.offset;
    }

    var limit = 12;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    gourmets.find().sort({ date: 'desc' }).limit(limit).skip(offset).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    gourmets.findOne({ _id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var gourmet = new gourmets();

    gourmet.food           = req.body.food;
    gourmet.restaurant     = req.body.restaurant;
    gourmet.image          = req.body.image;
    gourmet.url            = req.body.url;
    gourmet.date           = timestamp(req.body.date);

    gourmet.save(function(error)
    {
        var result = {
            "success": true,
            "msg": gourmet._id
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
    gourmets.findOne({ _id: req.body._id }, function(err, data)
    {
        data.food           = req.body.food;
        data.restaurant     = req.body.restaurant;
        data.image          = req.body.image;
        data.url            = req.body.url;
        data.date           = timestamp(req.body.date);

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