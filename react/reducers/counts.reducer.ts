const initialItems = [
    {
        title: 'Games',
        count: 0
    },
    {
        title: 'Gourmets',
        count: 0
    },
    {
        title: 'Hearthstone-Seasons',
        count: 0
    },
    {
        title: 'Hearthstone-Decks',
        count: 0
    },
    {
        title: 'Hearthstone-Matches',
        count: 0
    },
    {
        title: 'Blogs',
        count: 0
    }
]

const initialState = {
    isFetching: false,
    fetched: false,
    items: initialItems,
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case "FETCH_COUNTS_PENDING":
            return Object.assign({}, state, { isFetching: true });
        case "FETCH_COUNTS_FULFILLED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: Array.isArray(payload) ? payload : payload.data
            });
        case "FETCH_COUNTS_REJECTED":
            const { data, status } = payload.response;

            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}