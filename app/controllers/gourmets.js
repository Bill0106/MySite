/**
 * Created by bill on 15/8/13.
 */

var async    = require('async');
var moment   = require('moment');
var Gourmets = require('../models/gourmets');

exports.list = function(req, res)
{
    async.parallel([
        function (callback)
        {
            var limit  = req.query.limit ? req.query.limit : 30;
            var page   = req.query.page ? parseInt(req.query.page) : 1;
            var offset = limit * (page - 1);

            Gourmets.find().limit(limit).skip(offset).sort({ date: 'desc' }).exec(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, data);
                }
            });
        },
        function (callback)
        {
            Gourmets.count(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, data);
                }
            });
        }
    ], function (error, results)
    {
        if (error)
            throw error;

        res.json({
            list: results[0],
            total: results[1]
        });
    });
};

exports.find = function(req, res)
{
    Gourmets.findOne({ _id: req.params.id }, function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var gourmet = new Gourmets();

    gourmet.food           = req.body.food;
    gourmet.restaurant     = req.body.restaurant;
    gourmet.image          = req.body.image;
    gourmet.url            = req.body.url;
    gourmet.date           = moment(req.body.date, 'YYYY-MM-DD').valueOf();

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
    Gourmets.findOne({ _id: req.body._id }, function(err, data)
    {
        data.food           = req.body.food;
        data.restaurant     = req.body.restaurant;
        data.image          = req.body.image;
        data.url            = req.body.url;
        data.date           = moment(req.body.date, 'YYYY-MM-DD').valueOf();

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