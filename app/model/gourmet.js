/**
 * Created by Bill on 14-11-6.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GourmetSchema = new Schema({
    food: String,
    restaurant: String,
    image: String,
    url: String
});

module.exports = mongoose.model('Gourmet', GourmetSchema);