/**
 * Created by Bill on 14-11-21.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerProfileSchema = new Schema({
    name         : String,
    full_name    : String,
    birthday     : Number,
    nationality  : String,
    height       : Number,
    position     : String,
    number       : Number,
    value        : Number,
    joined       : Number,
    introduction : String,
    image        : String,
    stats_url    : String
});

module.exports = mongoose.model('PlayerProfile', playerProfileSchema);