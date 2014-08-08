/**
 * Created by Bill on 14-8-8.
 */

// modules
var express        = require('express');
var app            = express();
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var favicon        = require('serve-favicon');
var mongoose       = require('mongoose');

// configuration
var database = require('./config/database');
var port     = process.env.PORT || 8888;

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/images' }));
app.use(cookieParser());
app.use(methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
var router = express.Router();
require('./app/routes')(app, router);

// start app
app.listen(port);
console.log('Server running on port ' + port);

exports = module.exports = app;