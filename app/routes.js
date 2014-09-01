/**
 * Created by Bill on 14-8-8.
 */

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

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

    // Image API Route
    var images = require('./controller/images');

    router.route('/images')
        .post(multipartyMiddleware, images.post);

    // PlayStation Games API Route
    var games = require('./controller/games');

    router.route('/games')
        .get(games.list)
        .post(games.post);

    // Apply API Routes
    app.use('/api', router);

    // Admin Route
    app.route('/admin')
        .get(function (req, res)
        {
            var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

            if (ip == '127.0.0.1') {
                res.sendfile('./public/views/admin.html');
            } else {
                res.redirect('/');
            }
        });

    app.route('/admin/database')
        .get(function(req, res)
        {
            var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

            if (ip == '127.0.0.1') {
                res.redirect('http://localhost:8081');
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
