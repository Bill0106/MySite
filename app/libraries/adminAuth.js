/**
 * Created by bill on 16/4/11.
 */

var basicAuth = require('basic-auth');

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

    if (user.name === 'admin' && user.pass === 'PNCfRu2o38NcvQBjEf2Vj4XQiJwH') {
        return next();
    } else {
        return unauthorized(res);
    }
}

module.exports = adminAuth;