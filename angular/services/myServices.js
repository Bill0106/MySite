/**
 * Created by bill on 15/8/20.
 */

angular.module('myServices', [])
    // Model Count API Service
    .factory('Count', function($resource)
    {
        return $resource('/api/count/:model');
    })
    // Game API Service
    .factory('Game', function($resource)
    {
        return $resource('/api/games/:game_url', { game_url: '@url'}, {
            update: {
                method: 'POST'
            }
        });
    })
    // Gourmet API Service
    .factory('Gourmet', function($resource)
    {
        return $resource('/api/gourmets/:id', { id: '@_id' }, {
            update: {
                method: 'POST'
            }
        });
    })
    // Hearth Stone Card API Service
    .factory('HSCard', function($resource)
    {
        return $resource('/api/hearth-stone/cards');
    })
    // Hearth Stone Deck API Service
    .factory('HSDeck', function($resource)
    {
        return $resource('/api/hearth-stone/decks/:id', { id: '@_id' }, {
            update: {
                method: 'POST'
            }
        });
    });