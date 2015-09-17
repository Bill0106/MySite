/**
 * Created by bill on 15/9/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrophiesSchema = new Schema({
    earned: Number,
    total: Number,
    trophies: Array
});

module.exports = mongoose.model('GameTrophies', TrophiesSchema);