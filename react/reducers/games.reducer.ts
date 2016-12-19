const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_GAMES_PENDING":
            return Object.assign({}, state, { isFetching: true, error: null });
        case "FETCH_GAMES_FULFILLED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: payload.data
            });
        case "FETCH_GAMES_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                } 
            });
        case "DELETE_GAME_PENDING":
            return Object.assign({}, state, { isFetching: true, error: null });
        case "DELETE_GAME_FULFILLED":
            const id = payload.data.data.id;
            let list = state.items['list'];
            let item = list.find(v => v._id == id);
            let index = list.indexOf(item);
            
            state.items['list'].splice(index, 1);
            state.items['total']--;

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
            });
        case "DELETE_GAME_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                } 
            });
        default:
            return state;
    }
}