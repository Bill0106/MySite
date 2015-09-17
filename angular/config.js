/**
 * Created by bill on 15/8/6.
 */

angular.module('myConfig', [])
    .constant('GAME_PLATFORMS', [
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
    ])
    .constant('GAME_GENRES', [
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
        },
        {
            value: 7,
            name: 'Strategy'
        }
    ])
    .constant('HS_PLAYER_CLASSES', [
        {
            value: 0,
            name: "Druid"
        },
        {
            value: 1,
            name: "Hunter"
        },
        {
            value: 2,
            name: "Mage"
        },
        {
            value: 3,
            name: "Paladin"
        },
        {
            value: 4,
            name: "Priest"
        },
        {
            value: 5,
            name: "Rogue"
        },
        {
            value: 6,
            name: "Shaman"
        },
        {
            value: 7,
            name: "Warlock"
        },
        {
            value: 8,
            name: "Warrior"
        }
    ])
    .constant('GAME_TROPHY_RARITY', [
        {
            value: 0,
            name: "Bronze"
        },
        {
            value: 1,
            name: "Gold"
        },
        {
            value: 2,
            name: "Silver"
        },
        {
            value: 3,
            name: "Platinum"
        }
    ]);