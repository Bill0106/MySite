/**
 * Created by Bill on 14-11-20.
 */

var async = require('async');
var mongoose = require('mongoose');
var database = require('../../config/database');
var timestamp = require('../../config/timestamp');

// Update League Table
var updateLeagueTable = require('./manutdLeagueTableUpdate');

// Update Player Stats
var updatePlayerStats = require('./manutdPlayerStatsUpdate');

// Update Match Fixtures
var updateMatchFixtures = require('./manutdMatchFixturesUpdate');

// MongoDB Connect
mongoose.connect(database.url);
mongoose.set('debug', true);

// Code Execute
async.parallel([updateLeagueTable, updatePlayerStats, updateMatchFixtures], function(err, results)
{
    console.log(results);
    process.exit();
});