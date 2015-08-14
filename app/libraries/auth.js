/**
 * Created by bill on 15/8/2.
 */

var key = require('../config/apiKey');

function isChecked(req, res, next)
{
    var auth = req.headers.auth;

    if (auth == key[req.method]) {
        return next();
    }

    res.redirect('/');
}

module.exports = isChecked;