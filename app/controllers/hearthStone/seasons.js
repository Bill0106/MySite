/**
 * Created by bill on 15/8/19.
 */

var seasons = require('../../models/hearthStone/seasons');
var timestamp = require('../../libraries/timestamp');

exports.list = function(req, res)
{
    seasons.find(function(err, data)
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

        res.json(data);
    });
};

exports.create = function(req, res)
{
    console.log(req.body);

    //var season = new seasons();
    //
    //season.title = req.body.title;
    //season.rank = req.body.rank;
    //season.image = req.body.image;
    //season.month = timestamp(req.body.month);
    //
    //
    //season.save(function(error)
    //{
    //    var result = {
    //        "success": true,
    //        "msg": season._id
    //    };
    //
    //    if (error) {
    //        result = {
    //            "success": false,
    //            "msg": error
    //        }
    //    }
    //
    //    res.json(result);
    //});
};

exports.update = function(req, res)
{
    console.log(req.body);
    //seasons.findOne({ _id: req.body._id }, function(err, data)
    //{
    //    data.title = req.body.title;
    //    data.rank = req.body.rank;
    //    data.image = req.body.image;
    //    data.month = timestamp(req.body.month);
    //    data.url = req.body.url;
    //
    //    data.save(function(error)
    //    {
    //        var result = {
    //            "success": true,
    //            "msg": data._id
    //        };
    //
    //        if (error) {
    //            result = {
    //                "success": false,
    //                "msg": error
    //            }
    //        }
    //
    //        res.json(result);
    //    });
    //});
};