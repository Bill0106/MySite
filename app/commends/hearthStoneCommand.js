/**
 * Created by bill on 15/8/17.
 */

var mongoose    = require('mongoose');
var database    = require('../config/database');
var cards       = require('../models/hearthStone/cards');
mongoose.connect(database);

var playerClass = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];

var rawData = [];

(function fire()
{
    var key = 'm8Ydu9cOBmmshaqxQorKcaMLZEDHp1oT2iQjsnwlXYOsZidTWi';
    var options = {
        headers: {
            'X-Mashape-Key': key
        }
    };
    var count = 0;

    var qualities = ["Common", "Free", "Rare", "Epic", "Legendary"];
    for (var i = 0; i < qualities.length; i++) {
        options['url'] = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/' + qualities[i];

        requestApi(options, function()
        {
            count++;
            if (count == qualities.length) {
                console.log('API requests complete, progress on saving data!');
                saveData(rawData, function(result)
                {
                    console.log('All cards saved. Total: ' + result);
                    process.exit();
                });
            }
        });
    }
})();

function requestApi(options, callback)
{
    var request = require('request');
    var count = 0;
    request(options, function(error, response, body)
    {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);

            for (i = 0; i < data.length; i++) {
                formatData(data[i], function()
                {
                    count++;
                    if (count == data.length) {
                        callback();
                    }
                });
            }
        }
    });
}

function formatData(data, callback)
{
    var types = ['Spell', 'Minion', 'Weapon'];

    if (data.collectible && types.indexOf(data.type) >= 0) {
        rawData.push(data);
        callback();
    } else {
        callback();
    }
}

function saveData(data, callback)
{
    var count = 0;

    for (var i = 0; i < data.length; i++) {
        saveToDataBase(data[i], function()
        {
            count++;
            if (count == data.length) {
                callback(count);
            }
        });
    }
}


function saveToDataBase(data, callback)
{
    cards.findOne({ cardId: data.cardId }, function(err, card)
    {
        if (err)
            throw err;

        if (!card) {
            card = new cards();
        }

        card.cardId = data.cardId;
        card.name = data.name;
        card.image = data.img;
        card.cost = data.cost;
        card.playerClass = playerClass.indexOf(data.playerClass);

        card.save(function()
        {
            console.log(card.name + ' saved');
            callback();
        });
    });
}