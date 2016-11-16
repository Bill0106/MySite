var async       = require('async');
var mongoose    = require('mongoose');
var database    = require('../config/database');

var Games = require('../models/games');
var Gourmets = require('../models/gourmets');

(function fire() {
    var total = 0;

    mongoose.connect(database);
    async.parallel([
        function(callback)
        {
            Games.find(function (err, data)
            {
                if (err) {
                    callback(err);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        var title = new Buffer(item.title).toString('base64');
                        item.title = title;
                        item.save(function (error)
                        {
                            if (error) {
                                eachCallback(error);
                            } else {
                                console.log(item._id + ' Saved');
                                total++;
                                eachCallback();
                            }
                        });
                    }, function(eachError) {
                        if (eachError) {
                            callback(eachError);
                        } else {
                            callback(null, data.length);
                        }
                    });
                }
            })
        },
        function(callback)
        {
            Gourmets.find(function (err, data)
            {
                if (err) {
                    callback(err);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        var food = new Buffer(item.food).toString('base64');
                        var restaurant = new Buffer(item.restaurant).toString('base64');
                        item.food = food;
                        item.restaurant = restaurant;
                        item.save(function (error)
                        {
                            if (error) {
                                eachCallback(error);
                            } else {
                                console.log(item._id + ' Saved');
                                total++;
                                eachCallback();
                            }
                        });
                    }, function(eachError) {
                        if (eachError) {
                            callback(eachError);
                        } else {
                            callback(null, data.length);
                        }
                    });
                }
            })
        }
    ], function(error, results)
    {
        if (error)
            throw error;

        console.log('All Finished! Saved: ' + total + ' All: ' + (results[0] + results[1]));

        process.exit();
    });
})();