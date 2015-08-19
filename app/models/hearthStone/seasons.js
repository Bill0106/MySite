/**
 * Created by bill on 15/8/19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeasonsSchema = new Schema({
    title   : String,
    image   : String,
    rank    : Number,
    decks   : Array
});

module.exports = mongoose.model('HearthStoneSeasons', SeasonsSchema);