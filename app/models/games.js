/**
 * Created by bill on 15/8/2.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamesSchema = new Schema({
    title       : String,
    name        : String,
    publisher   : String,
    developer   : String,
    release_at  : Number,
    buy_at      : Number,
    rate        : Number,
    image       : String,
    url         : String,
    platform    : Number,
    genre       : Number,
    description : String,
    trophies    : String
});

module.exports = mongoose.model('Games', GamesSchema);