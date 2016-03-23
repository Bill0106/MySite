/**
 * Created by bill on 15/3/22.
 */

var mongoose = require('mongoose');
var database = require('../config/database');
var Wins = require('../models/hearthStone/wins');
var Seasons = require('../models/hearthStone/seasons');
var moment = require('moment');
var async = require('async');
var Matches = require('../models/hearthStone/matches');

var totalMatches = 0;
var totalSaved = 0;

mongoose.connect(database);

(function fire()
{
    Wins.find(function(err, data)
    {
        if (err)
            throw err;

        async.eachSeries(data, function iteratee(item, eachCallback)
        {
            itemHandle(item, eachCallback);
        }, function(err, result) {
            console.log('All Finished! Saved: ' + totalSaved + ' All: ' + totalMatches);
            process.exit();
        });
    });
})();

function itemHandle(item, cb)
{
    async.waterfall([
        function(callback)
        {
            Seasons.findOne({ _id: item.season_id }, function(err, data)
            {
                if (err)
                    throw err;

                callback(null, data.month);
            });
        },
        function(month, callback)
        {
            var total = item.overall[0].total;
            var count = 0;
            var matches = [];

            totalMatches = totalMatches + total;
            Object.keys(item.detail[0]).forEach(function(element, index, array)
            {
                for (var i = 0; i < item.detail[0][element].total; i++) {
                    if (i < item.detail[0][element].win) {
                        var result = 1;
                    } else {
                        var result = 0;
                    }

                    var val = {
                        deck_id: item.deck_id,
                        time: month,
                        result: result,
                        opponent: element,
                    };

                    matches.push(val);
                    if (matches.length == total) {
                        callback(null, matches);
                    }
                }
            });
        },
        function(array, callback)
        {
            var count = 0;

            array.forEach(function(element, index, array)
            {
                var match = new Matches();

                match.deck_id = element.deck_id;
                match.result = element.result;
                match.time = element.result;
                match.opponent = match.opponent;

                match.save(function(err)
                {
                    if (err)
                        throw err;

                    count++;
                    totalSaved++;
                    if (count == array.length) {
                        callback(null, 'Saved: ' + item._id);
                    }
                });
            });
        },
    ], function (err, result) {
        console.log(result);
        cb();
    });
}
