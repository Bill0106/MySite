const ITEMS_PER_PAGE = 30;

const ADMIN_LIST_PAGE = [
    {
        path: 'Games',
        fields: ['title', 'name', 'platform', 'genre'],
        per: ITEMS_PER_PAGE,
    },
    {
        path: 'Gourmets',
        fields: ['food', 'restaurant', 'date', 'url'],
        per: ITEMS_PER_PAGE,
    },
    {
        path: 'Hearthstone-Seasons',
        fields: ['title', 'month', 'rank', 'url'],
        per: ITEMS_PER_PAGE,
    },
    {
        path: 'Hearthstone-Decks',
        fields: ['name', 'class', 'active'],
        per: ITEMS_PER_PAGE,
    },
    {
        path: 'Hearthstone-Matches',
        fields: ['time', 'deck', 'opponent', 'result'],
        per: 100,
    }
];

export let AdminListPage = ADMIN_LIST_PAGE;