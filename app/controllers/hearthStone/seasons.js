/**
 * Created by bill on 15/8/19.
 */

var seasons = require('../../models/hearthStone/seasons');

exports.list = function(req, res)
{
    seasons.find(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};

exports.create = function(req, res)
{
    if (req.body._id) {
        seasons.findOne({ _id: req.body._id }, function(err, data)
        {
            data.title = req.body.title;
            data.rank = req.body.rank;
            data.image = req.body.image;
            data.month = req.body.month;

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
    } else {
        var season = new seasons();

        season.title = req.body.title;
        season.rank = req.body.rank;
        season.image = req.body.image;
        season.month = req.body.month;

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
    }
};