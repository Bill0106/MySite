export const actionTypes = {
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
    item: {
        change: 'CHANGE_ITEM',
        init: 'INIT_ITEM_CREATE',
        set: 'SET_ITEM',
    }
}