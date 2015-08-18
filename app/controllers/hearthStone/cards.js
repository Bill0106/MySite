/**
 * Created by bill on 15/8/18.
 */

var cards = require('../../models/hearthStone/cards');

exports.list = function(req, res)
{
    cards.find().sort({ cost: 'asc' }).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};