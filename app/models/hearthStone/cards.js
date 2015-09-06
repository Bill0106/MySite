/**
 * Created by bill on 15/8/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardsSchema = new Schema({
    cardId      : String,
    name        : String,
    image       : String,
    cost        : Number,
    playerClass : Number,
    rarity      : Number
});

module.exports = mongoose.model('HearthStoneCards', CardsSchema);