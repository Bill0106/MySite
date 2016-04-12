/**
 * Created by bill on 15/8/18.
 */

var cards = require('../../models/hearthStone/cards');

exports.list = function(req, res)
{
    var query = cards.find().where('playerClass').equals(req.query.playerClass);

    if (req.query.playerClass == -1) {
        if (!req.query.cost || req.query.cost == 1) {
            query.where('cost').lt(2);
        } else if (req.query.cost == 7) {
            query.where('cost').gt(6);
        } else {
            query.where('cost').equals(req.query.cost);
        }
    }

    query.sort({ cost: 'asc' }).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};