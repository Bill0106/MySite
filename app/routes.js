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
        .get(games.find)
        .post(games.update);

    // Gourmets API Route
    var gourmets = require('./controllers/gourmets');
    router.route('/gourmets')
        .get(gourmets.list)
        .post(gourmets.create);
    router.route('/gourmets/:id')
        .get(gourmets.find)
        .post(gourmets.update);

    // HearthStone API Route
    var cards = require('./controllers/hearthStone/cards');
    var decks = require('./controllers/hearthStone/decks');
    var seasons = require('./controllers/hearthStone/seasons');
    router.route('/hearth-stone/seasons')
        .get(seasons.list)
        .post(seasons.create);
    router.route('/hearth-stone/decks')
        .get(decks.list)
        .post(decks.create);
    router.route('/hearth-stone/decks/:id')
        .get(decks.find)
        .post(decks.update);
    router.route('/hearth-stone/cards')
        .get(cards.list);

    // Model Count API Route
    var count = require('./controllers/count');
    router.route('/count/games').get(count.games);
    router.route('/count/gourmets').get(count.gourmets);
    router.route('/count/cards').get(count.cards);

    // Apply API Routes
    app.use('/api', router);

    // Admin Route
    app.route('/admin*')
        .get(function(req, res)
        {
            //var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
            //
            //if (ip == '127.0.0.1') {
                res.sendFile(path.join(__dirname, '../public/views/admin', 'layout.html'));
            //} else {
            //    res.redirect('/');
            //}
        });

    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.sendFile(path.join(__dirname, '../public/views/app', 'layout.html'));
        });
};