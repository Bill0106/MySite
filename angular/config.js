/**
 * Created by bill on 15/8/6.
 */

var gamePlatforms = [
    {
        value: 0,
        name: 'PlayStation 3'
    },
    {
        value: 1,
        name: 'PlayStation Vita'
    },
    {
        value: 2,
        name: 'PlayStation 4'
    }
];

var gameGenres = [
    {
        value: 0,
        name: 'Action'
    },
    {
        value: 1,
        name: 'Adventure'
    },
    {
        value: 2,
        name: 'Fighting'
    },
    {
        value: 3,
        name: 'Racing'
    },
    {
        value: 4,
        name: 'Role-Playing'
    },
    {
        value: 5,
        name: 'Sports'
    },
    {
        value: 6,
        name: 'Third-person shooter'
    }
];

var myConfig = angular.module('myConfig', [])
    .constant('GAME_PLATFORMS', gamePlatforms)
    .constant('GAME_GENRES', gameGenres);