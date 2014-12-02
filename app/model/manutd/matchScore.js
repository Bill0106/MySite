/**
 * Created by Bill on 14-11-26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchScoreSchema = new Schema({
    match_id : String,
    time     : Number,
    team     : Number,
    player   : String,
    type     : Number
});

matchScoreSchema.index({ match_id: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('MatchScore', matchScoreSchema);