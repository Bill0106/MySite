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
    switch (action.type) {
        case "FETCH_COUNTS_PENDING":
            return Object.assign({}, state, { isFetching: true });
        case "FETCH_COUNTS_FULFILLED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: action.payload.data
            });
        case "FETCH_COUNTS_REJECTED":
            const { response } = action.payload;
            const { data, status } = response;

            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}