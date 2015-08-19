/**
 * Created by bill on 15/8/19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeasonsSchema = new Schema({
    title   : String,
    month   : Number,
    rank    : Number,
    image   : String,
    decks   : Array
});

module.exports = mongoose.model('HearthStoneSeasons', SeasonsSchema);