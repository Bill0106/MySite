/**
 * Created by Bill on 14-11-25.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerStatsSchema = new Schema({
    player_id  : String,
    competition: String,
    team       : String,
    starter    : Number,
    sub        : Number,
    goals      : Number,
    assists    : Number,
    shots      : Number,
    targets    : Number
});

playerStatsSchema.index({ player_id: 1, competition: 1 }, { unique: true });

module.exports = mongoose.model('PlayerStats', playerStatsSchema);