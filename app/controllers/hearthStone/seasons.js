/**
 * Created by bill on 15/8/19.
 */

var seasons = require('../../models/hearthStone/seasons');
var moment = require('moment');

exports.list = function(req, res)
{
    var query = seasons.find();

    if (req.query.months) {
        query = query.where('month').in(req.query.months.split(','));
    }

    if (req.query.limit) {
        var limit  = req.query.limit;
        var page   = req.query.page ? parseInt(req.query.page) : 1;
        var offset = limit * (page - 1);

        query = query.limit(parseInt(limit)).skip(offset);
    }

    query.sort({ month: 'desc' }).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.find = function(req, res)
{
    seasons.findOne({ url: req.params.url }, function(err, data)
    {
        if (err)
            res.send(err);

        if (data)
            data.month = moment(data.month, 'YYYYMM').valueOf();

        res.json(data);
    });
};

exports.create = function(req, res)
{
    var ts = moment(req.body.month, 'YYYY-MM').set('hour', 0).valueOf();

    var season = new seasons();

    season.title = req.body.title;
    season.rank = req.body.rank;
    season.image = req.body.image;
    season.month = moment(ts).format('YYYYMM');
    season.url = moment(ts).format('MMMM').toLowerCase() + '-' + moment(ts).format('YYYY') + '-' + req.body.title.toLowerCase().replace(/ /g, '-');
    season.decks = req.body.decks;
    season.description = req.body.description;

    season.save(function(error)
    {
        var result = {
            "success": true,
            "msg": season._id
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
    var ts = moment(req.body.month, 'YYYY-MM').set('hour', 0).valueOf();

    seasons.findOne({ _id: req.body._id }, function(err, data)
    {
        data.title = req.body.title;
        data.rank = req.body.rank;
        data.image = req.body.image;
        data.month = moment(ts).format('YYYYMM');
        data.url = req.body.url;
        data.decks = req.body.decks;
        data.description = req.body.description;

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