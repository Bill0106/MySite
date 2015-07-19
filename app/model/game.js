/**
 * Created by Bill on 14-8-11.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
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

module.exports = mongoose.model('Game', GameSchema);