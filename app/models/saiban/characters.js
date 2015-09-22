/**
 * Created by bill on 15/9/22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharactersSchema = new Schema({
    name         : String,
    avatar       : Number,
    image        : Number,
    description  : String,
    games        : Array
});

module.exports = mongoose.model('SaibanCharacters', CharactersSchema);