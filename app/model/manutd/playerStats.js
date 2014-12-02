/**
 * Created by Bill on 14-11-25.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerStatsSchema = new Schema({
    player_id   : String,
    competition : String,
    team        : String,
    starter     : Number,
    sub         : Number,
    goals       : Number,
    assists     : Number,
    shots       : Number,
    targets     : Number
});

module.exports = mongoose.model('PlayerStats', playerStatsSchema);