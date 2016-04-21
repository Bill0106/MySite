/**
 * Created by bill on 16/4/20.
 */

var async    = require('async');
var mongoose = require('mongoose');
var moment   = require('moment');
var database = require('../config/database');
var seasons  = require('../models/hearthStone/seasons');

mongoose.connect(database);

(function fire()
{
    seasons.find(function(error, data)
    {
        if (error)
            throw error;

        async.eachSeries(data, function iteratee(item, eachCallback)
        {
            saveData(item, eachCallback);
        }, function()
        {
            console.log('All Finish!');
            process.exit();
        });
    });
})();

function saveData(season, callback)
{
    var month = moment(season.month).format('YYYYMM');

    seasons.findOne({ _id: season._id }, function(err, data)
    {
        if (err)
            throw err;

        data.month = month;

        data.save(function()
        {
            console.log(data._id + ' saved!');
            callback();
        });
    });
}