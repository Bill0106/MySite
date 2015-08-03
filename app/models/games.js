/**
 * Created by bill on 15/8/2.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamesSchema = new Schema({
    title       : String,
    name        : String,
    platform    : String,
    genre       : String,
    company     : Array,
    date        : String,
    rate        : Number,
    description : String,
    image       : String,
    url         : String
});

module.exports = mongoose.model('Games', GamesSchema);