const ITEMS_PER_PAGE = 30;

const ADMIN_LIST_PAGE = [
    {
        path: 'games',
        api: '/games',
        fields: ['title', 'name', 'platform', 'genre'],
        per: ITEMS_PER_PAGE,
        table: 'Games'
    },
    {
        path: 'gourmets',
        api: '/gourmets',
        fields: ['food', 'restaurant', 'date', 'url'],
        per: ITEMS_PER_PAGE,
        table: 'Gourmets'
    },
    {
        path: 'hearthstone-seasons',
        api: '/hearthstone-seasons',
        fields: ['title', 'month', 'rank', 'url'],
        per: ITEMS_PER_PAGE,
        table: 'Hearthstone Seasons'
    },
    {
        path: 'hearthstone-decks',
        api: '/hearthstone-decks',
        fields: ['name', 'class', 'active'],
        per: ITEMS_PER_PAGE,
        table: 'Hearthstone Decks'
    },
    {
        path: 'hearthstone-matches',
        api: '/hearthstone-matches',
        fields: ['time', 'deck', 'opponent', 'result'],
        per: 100,
        table: 'Hearthstone Matches'
    }
];

export let AdminListPage = ADMIN_LIST_PAGE;