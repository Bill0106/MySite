/**
 * Created by Bill on 14-11-20.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leagueTableSchema = new Schema({
    club       : String,
    played     : Number,
    won        : Number,
    drawn      : Number,
    lost       : Number,
    for        : Number,
    against    : Number,
    difference : Number,
    points     : Number
});

module.exports = mongoose.model('LeagueTable', leagueTableSchema);