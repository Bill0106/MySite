/**
 * Created by bill on 15/7/30.
 */

var express     = require('express');
var app         = require('./app/config/app');
var router      = express.Router();
require('./app/routes')(app, router);

var mongoose    = require('mongoose');
var database    = require('./app/config/database');
mongoose.connect(database);

var port        = process.env.PORT || 8888;
app.listen(port);
console.log('Server running on port ' + port);