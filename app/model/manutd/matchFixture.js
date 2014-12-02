/**
 * Created by Bill on 14-11-26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchFixtureSchema = new Schema({
    time        : Number,
    game_id     : Number,
    competition : String,
    location    : Number,
    opponent    : String,
    home        : String,
    away        : String
});

module.exports = mongoose.model('MatchFixture', matchFixtureSchema);