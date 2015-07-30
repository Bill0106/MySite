/**
 * Created by bill on 15/7/30.
 */

var express = require('express');
var app     = require('./app/config/app');
var port    = process.env.PORT || 8888;

var router = express.Router();
require('./app/routes')(app, router);

app.listen(port);
console.log('Server running on port ' + port);