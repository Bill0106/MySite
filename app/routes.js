/**
 * Created by Bill on 14-8-8.
 */

var isAuthenticated = require('../config/authenticate');

module.exports = function(app, router)
{
    router.use(isAuthenticated, function(req, res, next)
    {
        next();
    });

    // Home Links API Route
    var homeLinks = require('../config/homelinks');

    router.route('/homelinks')
        .get(function(req, res)
        {
            res.json(homeLinks);
        });

    // Apply API Routes
    app.use('/api', router);

    // Admin Route
    app.route('/admin')
        .get(function (req, res) {
            var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

            if (ip == '127.0.0.1') {
                res.sendfile('./public/views/admin.html');
            } else {
                res.redirect('/');
            }
        });

    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.sendfile('./public/views/layout.html');
        });
};
