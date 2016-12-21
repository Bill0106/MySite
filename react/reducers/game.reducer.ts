const initialState = {
    isFetching: false,
    fetched: false,
    item: null,
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "FETCH_GAME_PENDING":
            return Object.assign({}, state, { isFetching: true, error: null });
        case "FETCH_GAME_FULFILLED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                item: payload.data
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
        case "CHANGE_FIELD":
            const { field, value } = payload;
            let { item } = state;
            item[field] = value;
            return Object.assign({}, state, { item: item });
        default:
            return state;
    }
}