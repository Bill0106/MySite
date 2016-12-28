const initialState = {
    isFetching: false,
    fetched: false,
    posted: false,
    item: {},
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "INIT_GAME_CREATE":
            return Object.assign({}, state, initialState);
        case "FETCH_GAME_PENDING":
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                posted: false
            });
        case "FETCH_GAME_FULFILLED":
            console.log();
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                item: payload.hasOwnProperty('_id') ? payload : payload.data
            });
        case "FETCH_GAME_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                }
            });
        case "POST_GAME_PENDING":
            return Object.assign({}, state, { isFetching: true });
        case "POST_GAME_FULFILLED":
            return Object.assign({}, state, { isFetching: false, posted: true });
        case "POST_GAME_REJECTED":
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