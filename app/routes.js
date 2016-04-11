/**
 * Created by bill on 15/7/30.
 */

var path = require('path');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

module.exports = function(app, router)
{
    var isChecked = require('./libraries/auth');
    router.use(isChecked, function(req, res, next)
    {
        next();
    });

    // Images API Route
    var images = require('./controllers/images');
    router.route('/images')
        .post(multipartyMiddleware, images.post);

    // Games API Route
    var games = require('./controllers/games/games');
    var scrap = require('./controllers/games/scrap');
    router.route('/games')
        .get(games.list)
        .post(games.create);
    router.route('/games/trophy/:id')
        .get(games.findTrophy)
        .post(games.updateTrophy);
    router.route('/games/:url')
        .get(games.find)
        .post(games.update);
    router.route('/games/scrap/:id')
        .post(scrap.scrap);

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
    var wins = require('./controllers/hearthStone/wins');
    var matches = require('./controllers/hearthStone/matches');
    router.route('/hearth-stone/seasons')
        .get(seasons.list)
        .post(seasons.create);
    router.route('/hearth-stone/seasons/:url')
        .get(seasons.find)
        .post(seasons.update);

    router.route('/hearth-stone/decks')
        .get(decks.list)
        .post(decks.create);
    router.route('/hearth-stone/decks/:id')
        .get(decks.find)
        .post(decks.update);

    router.route('/hearth-stone/cards')
        .get(cards.list);

    router.route('/hearth-stone/wins')
        .get(wins.list)
        .post(wins.create);
    router.route('/hearth-stone/wins/:id')
        .get(wins.find)
        .post(wins.update);
    router.route('/hearth-stone/season_wins/:id')
        .get(wins.season);
    router.route('/hearth-stone/deck_wins/:id')
        .get(wins.deck);

    router.route('/hearth-stone/matches')
        .get(matches.list)
        .post(matches.create);

    // Saiban API Route
    var saibanGames = require('./controllers/saiban/games');
    router.route('/saiban/games')
        .get(saibanGames.list)
        .post(saibanGames.create);
    router.route('/saiban/games/:url')
        .get(saibanGames.find)
        .post(saibanGames.update);

    // Model Count API Route
    var count = require('./controllers/count');
    router.route('/count/games').get(count.games);
    router.route('/count/gourmets').get(count.gourmets);
    router.route('/count/cards').get(count.cards);

    // Apply API Routes
    app.use('/api', router);

    // Admin Route
    var adminAuth = require('./libraries/adminAuth');
    app.get('/admin*', adminAuth, function(req, res)
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
