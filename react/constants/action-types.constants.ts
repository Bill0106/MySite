const actionTypes = {
    counts: {
        fetch_list: 'FETCH_COUNTS',
    },
    games: {
        fetch_list: 'FETCH_GAMES',
        fetch_item: 'FETCH_GAME',
        post: 'POST_GAME',
        delete: 'DELETE_GAME',
    },
    gourmets: {
        fetch_list: 'FETCH_GOURMETS',
        fetch_item: 'FETCH_GOURMET',
        post: 'POST_GOURMET',
        delete: 'DELETE_GOURMET',
    },
    hearthstone_seasons: {
        fetch_list: 'FETCH_HEARTHSTONE_SEASONS',
        fetch_item: 'FETCH_HEARTHSTONE_SEASON',
        post: 'POST_HEARTHSTONE_SEASON',
        delete: 'DELETE_HEARTHSTONE_SEASON',
    },
    hearthstone_decks: {
        fetch_list: 'FETCH_HEARTHSTONE_DECKS',
        fetch_item: 'FETCH_HEARTHSTONE_DECK',
        post: 'POST_HEARTHSTONE_DECK',
        delete: 'DELETE_HEARTHSTONE_DECK',
        active: 'ACTIVE_HEARTHSTONE_DECK',
        inactive: 'INACTIVE_HEARTHSTONE_DECK',
    },
    hearthstone_cards: {
        fetch_list: 'FETCH_HEARTHSTONE_CARDS',
        active_cost: 'CHANGE_HEARTHSTONE_CARDS_COST',
    },
    image: {
        init: 'INIT_IMAGE',
        post: 'POST_IMAGE',
    },
    item: {
        change: 'CHANGE_ITEM',
        init: 'INIT_ITEM_CREATE',
        set: 'SET_ITEM',
    },
};

export default actionTypes;