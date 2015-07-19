/**
 * Created by bill on 15/7/5.
 */

var mongoose = require('mongoose');
var database = require('../../config/database');
var timestamp = require('../../config/timestamp');

mongoose.connect(database.url);
mongoose.set('debug', true);

var Game = require('../model/game');

function update(data, count, total, callback)
{
    Game.findOne({ _id: data._id }, function(err, game)
    {
        if (err) throw err;

        var newDate = timestamp(data.date);
        var company = data.company[0];

        var newCompany = [];
        if (company.indexOf('/') > 0) {
            var companies = company.split(' / ');
            newCompany[0] = companies[0];
            newCompany[1] = companies[1];
        } else {
            newCompany[0] = company;
            newCompany[1] = company;
        }

        game.company = newCompany;
        game.date = newDate;

        game.save(function(err)
        {
            if (err) throw err;

            if (count == (total - 1)) callback('All Finish!');
        });
    });
}

Game.find(function(err, data)
{
    if (err) throw err;

    for (var i = 0; i < data.length; i++) {
        update(data[i], i, data.length, function(result)
        {
            console.log(result);
            process.exit();
        });
    }
});