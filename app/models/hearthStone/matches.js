/**
 * Created by bill on 16/3/22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchesSchema = new Schema({
    deck_id  : String,
    opponent : Number,
    result   : Number,
    time     : Number,
});

module.exports = mongoose.model('HearthStoneMatches', MatchesSchema);
