/**
 * Created by Bill on 14-11-20.
 */

var async = require('async');
var mongoose = require('mongoose');
var database = require('../../config/database');

// Update League Table
var updateLeagueTable = require('./manutdLeagueTableUpdate');

// Update Player Stats
var updatePlayerStats = require('./manutdPlayerStatsUpdate');

// Update Match Fixtures
var updateMatchFixtures = require('./manutdMatchFixturesUpdate');

// Update Match Scores
var updateMatchScores = require('./manutdMatchScoresUpdate');

// MongoDB Connect
mongoose.connect(database.url);
mongoose.set('debug', true);

// Code Execute
async.parallel([updateLeagueTable, updatePlayerStats, updateMatchFixtures, updateMatchScores], function(err, results)
{
    console.log(results);
    process.exit();
});