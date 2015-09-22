/**
 * Created by bill on 15/9/22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = new Schema({
    title        : String,
    description  : String,
    date         : Number,
    games        : Array,
    characters   : Array
});

module.exports = mongoose.model('SaibanEvents', EventsSchema);