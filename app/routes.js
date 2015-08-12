/**
 * Created by bill on 15/7/30.
 */

var path = require('path');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var isChecked = require('./libraries/auth');

module.exports = function(app, router)
{
    router.use(isChecked, function(req, res, next)
    {
        next();
    });

    // Images API Route
    var images = require('./controllers/images');
    router.route('/images')
        .post(multipartyMiddleware, images.post);

    // Games API Route
    var games = require('./controllers/games');
    router.route('/games')
        .get(games.list)
        .post(games.create);
    router.route('/games/:game_url')
        .get(games.find);

    // Model Count API Route
    var count = require('./controllers/count');
    router.route('/count/games')
        .get(count.games);

    // Apply API Routes
    app.use('/api', router);

    // Admin Route
    app.route('/admin*')
        .get(function(req, res)
        {
            res.sendFile(path.join(__dirname, '../public/views/admin', 'layout.html'));
        });

    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.sendFile(path.join(__dirname, '../public/views/app', 'layout.html'));
        });
};