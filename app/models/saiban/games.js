/**
 * Created by bill on 15/9/22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamesSchema = new Schema({
    series       : Number,
    order        : Number,
    title        : String,
    release_at   : Number,
    platform     : Number,
    image        : String,
    description  : String,
    chapters     : Array,
    url          : String
});

module.exports = mongoose.model('SaibanGames', GamesSchema);