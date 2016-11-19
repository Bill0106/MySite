/**
 * Created by bill on 16/4/11.
 */

var basicAuth = require('basic-auth');
var auth = require('../config/admin');

function adminAuth(req, res, next)
{
    if (process.env && process.env.NODE_ENV == 'dev') {
        return next();
    }

    function unauthorized(res)
    {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === auth.user && user.pass === auth.password) {
        return next();
    } else {
        return unauthorized(res);
    }
}

module.exports = adminAuth;