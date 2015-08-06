/**
 * Created by bill on 15/7/30.
 */

var path = require('path');
var isChecked = require('./libraries/auth');

module.exports = function(app, router)
{
    router.use(isChecked, function(req, res, next)
    {
        next();
    });

    // Games API Route
    var games = require('./controllers/games');
    router.route('/games')
        .get(games.list);
    router.route('/games/:game_url')
        .get(games.find);

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