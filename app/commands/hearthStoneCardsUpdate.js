/**
 * Created by bill on 15/8/17.
 */

var async       = require('async');
var mongoose    = require('mongoose');
var database    = require('../config/database');
var Cards       = require('../models/hearthStone/cards');
mongoose.connect(database);

var sets = ['Naxxramas', 'Goblins vs Gnomes'];
var playerClass = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
var rarity = ["Free", "Common", "Rare", "Epic", "Legendary"];

(function fire()
{
    async.waterfall([

        // Request API
        function (callback)
        {
            var request = require('request');
            var options = {
                headers: {
                    'X-Mashape-Key': 'm8Ydu9cOBmmshaqxQorKcaMLZEDHp1oT2iQjsnwlXYOsZidTWi'
                },
                url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1'
            };

            console.log('Requesting API ...');
            request(options, function (error, response, body)
            {
                if (error || response.statusCode != 200)
                    callback('API request failed!');

                var data = JSON.parse(body);
                var cards = [];
                async.each(Object.keys(data), function (item, eachCallback)
                {
                    if (data[item].length > 0) {
                        cards = cards.concat(data[item]);
                    }
                    eachCallback();
                }, function (err)
                {
                    var newCards = cards.filter(function (item)
                    {
                        var types = ['Spell', 'Minion', 'Weapon'];

                        return types.indexOf(item.type) >= 0;
                    });

                    callback(null, newCards);
                });
            });
        },

        // Save Data
        function (cards, callback)
        {

            async.each(cards, function (item, eachCallback)
            {
                saveCard(item, eachCallback);
            }, function (err, result)
            {
                if (err)
                    callback(err);

                callback(null);
            });
        }
    ], function (error, result)
    {
        if (error)
            throw error;

        console.log('All Finish!');
        process.exit();
    });
})();

function saveCard (item, cb)
{
    Cards.findOne({ cardId: item.cardId }, function(err, card)
    {
        if (err)
            eachCallback(err);

        if (!card) {
            card = new Cards();
        }

        card.cardId = item.cardId;
        card.name = item.name;
        card.image = item.img;
        card.cost = item.cost;
        card.playerClass = playerClass.indexOf(item.playerClass);
        card.rarity = rarity.indexOf(item.rarity);

        if (sets.indexOf(item.cardSet) < 0) {
            card.standard = true;
        } else {
            card.standard = false;
        }

        card.save(function()
        {
            console.log(card.name + ' saved!');
            cb();
        });
    });
}