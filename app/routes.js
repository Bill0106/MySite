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

    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.sendfile('./public/views/layout.html');
        });
};
