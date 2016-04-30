/**
 * Created by bill on 15/8/18.
 */

var cards = require('../../models/hearthStone/cards');

exports.list = function(req, res)
{
    var query = cards.find().where('playerClass').equals(req.query.playerClass);

    if (req.query.standard) {
        query.where('standard').equals(true);
    }

    if (req.query.cost) {
        if (req.query.cost == 1) {
            query.where('cost').lte(1);
        } else if (req.query.cost == 7) {
            query.where('cost').gte(7);
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