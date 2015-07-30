/**
 * Created by bill on 15/7/30.
 */

var app  = require('./app/config/app');
var port = process.env.PORT || 8888;

app.listen(port);
console.log('Server running on port ' + port);

exports = module.exports = app;