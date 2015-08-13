/**
 * Created by bill on 15/8/13.
 */

var gourmets = require('../models/gourmets');

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