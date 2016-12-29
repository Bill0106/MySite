const initialState = {
    isFetching: false,
    fetched: false,
    posted: false,
    item: {},
    error: null,
}

export default function reducer(state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case "INIT_HEARTHSTONE_SEASON_CREATE":
            return Object.assign({}, state, initialState);
        case "FETCH_HEARTHSTONE_SEASON_PENDING":
            return Object.assign({}, state, initialState, { isFetching: true });
        case "FETCH_HEARTHSTONE_SEASON_FULFILLED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                item: payload.data
            });
        case "FETCH_HEARTHSTONE_SEASON_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                }
            });
        case "POST_HEARTHSTONE_SEASON_PENDING":
            return Object.assign({}, state, { isFetching: true });
        case "POST_HEARTHSTONE_SEASON_FULFILLED":
            return Object.assign({}, state, { isFetching: false, posted: true });
        case "POST_HEARTHSTONE_SEASON_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                }
            });
        case "CHANGE_FIELD":
            const { field, value } = payload;
            let { item } = state;
            item[field] = value;
            return Object.assign({}, state, { item: item });
        default:
            return state;
    }
}