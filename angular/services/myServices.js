/**
 * Created by bill on 15/8/20.
 */

angular.module('myServices', ['ngResource'])
    // Model Count API Service
    .factory('Count', function($resource)
    {
        return $resource('/api/count/:model');
    })
    // Game API Service
    .factory('Game', function($resource)
    {
        return $resource('/api/games/:url', { url: '@url'}, {
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
    // Hearth Stone API Service
    .factory('HSCard', function($resource)
    {
        return $resource('/api/hearth-stone/cards');
    })
    .factory('HSDeck', function($resource)
    {
        return $resource('/api/hearth-stone/decks/:id', { id: '@_id' }, {
            update: {
                method: 'POST'
            }
        });
    })
    .factory('HSSeason', function($resource)
    {
        return $resource('/api/hearth-stone/seasons/:url', { url: '@url' }, {
            update: {
                method: 'POST'
            }
        });
    })
    .factory('HSWin', function($resource)
    {
        return $resource('/api/hearth-stone/wins/:id', { id: '@_id'}, {
            update: {
                method: 'POST'
            }
        });
    });