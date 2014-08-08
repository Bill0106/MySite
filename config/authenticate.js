/**
 * Created by Bill on 14-8-8.
 */

function isAuthenticated(req, res, next)
{
    var auth = req.headers.auth;

    if (!auth) {
        res.redirect('/');
    } else {
        if (req.method == 'GET' && auth == 'ljpon3UUVTMMmIhE6Kcf') {
            return next();
        } else if (req.method == 'POST' && auth == 'HNoHW7HUKEYxW5DFxaVj') {
            return next();
        } else {
            res.redirect('/');
        }
    }
}

module.exports = isAuthenticated;