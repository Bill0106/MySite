/**
 * Created by bill on 16/4/11.
 */

var basicAuth = require('basic-auth');
var auth = require('../config/admin');
var username = new Buffer(auth.user, 'base64');
var password = new Buffer(auth.password, 'base64');

function adminAuth(req, res, next)
{
    function unauthorized(res)
    {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === username.toString() && user.pass === password.toString()) {
        return next();
    } else {
        return unauthorized(res);
    }
}

module.exports = adminAuth;