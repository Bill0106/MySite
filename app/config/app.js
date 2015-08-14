/**
 * Created by bill on 15/7/30.
 */

var express        = require('express');
var app            = express();
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var favicon        = require('serve-favicon');

app.use(express.static('./public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(favicon('./public/favicon.ico'));

exports = module.exports = app;