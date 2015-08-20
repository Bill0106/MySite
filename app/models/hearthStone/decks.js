/**
 * Created by bill on 15/8/19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeckSchema = new Schema({
    name        : String,
    playerClass : Number,
    cards       : Array
});

module.exports = mongoose.model('HearthStoneDecks', DeckSchema);