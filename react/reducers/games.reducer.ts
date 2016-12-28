const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    total: 0,
    fetchedPages: [],
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_GAMES_PENDING":
            return Object.assign({}, state, { isFetching: true, error: null });
        case "FETCH_GAMES_FULFILLED":
            let items = state.items.concat(payload.data.list);
            items.sort((a, b) => {
                if (a.buy_at > b.buy_at) return -1;
                if (a.buy_at < b.buy_at) return 1;
                if (a.release_at > b.release_at) return -1;
                if (a.release_at < b.release_at) return 1;
                return 0;
            });

            const url = payload.request.responseURL;
            const match = url.match(/page=(\d)/i);
            const page = match ? parseInt(match[1]) : 1;
            let pages = state.fetchedPages;
            pages.push(page);
            pages.sort((a, b) => {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
                total: state.total ? state.total : payload.data.total,
                fetchedPages: pages,
            });
        case "FETCH_GAMES_REJECTED":
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    status: payload.response.status,
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
                    status: payload.response.status,
                    data: payload.response.data
                } 
            });
        default:
            return state;
    }
}