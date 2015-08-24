/**
 * Created by bill on 15/8/21.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WinsSchema = new Schema({
    deck_id: String,
    season_id: String,
    overall: Array,
    detail: Array
});

module.exports = mongoose.model('HearthStoneWins', WinsSchema);