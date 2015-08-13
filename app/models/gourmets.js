/**
 * Created by bill on 15/8/13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GourmetsSchema = new Schema({
    food: String,
    restaurant: String,
    date: Number,
    image: String,
    url: String
});

module.exports = mongoose.model('Gourmets', GourmetsSchema);