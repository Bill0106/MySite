/**
 * Created by bill on 15/8/18.
 */

var cards = require('../../models/hearthStone/cards');

exports.list = function(req, res)
{
    var playerClass = -1;
    if (req.query.playerClass) {
        playerClass = req.query.playerClass;
    }

    var offset = 0;
    if (req.query.offset) {
        offset = req.query.offset * 8;
    }

    cards.find({
        playerClass: playerClass
    }).sort({ cost: 'asc' }).limit(8).skip(offset).exec(function(err, data)
    {
        if (err)
            res.send(err);

        res.json(data);
    });
};