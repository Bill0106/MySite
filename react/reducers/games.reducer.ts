import helpers from '../helpers';

export default function reducer(state = helpers.initialState, action) {
    const { actionTypeStatus } = helpers;
    const { games } = helpers.actionTypes;
    const { type, payload } = action;

    switch (type) {
        case actionTypeStatus(games.fetch_list, 'pending'):
            return Object.assign({}, state, { isFetching: true, error: null });
        case actionTypeStatus(games.fetch_list, 'success'):
            let newSet = new Set(state.items.concat(payload.data.list));
            let items = Array.from(newSet)
            items.sort((a, b) => {
                if (a.buy_at > b.buy_at) return -1;
                if (a.buy_at < b.buy_at) return 1;
                if (a.release_at > b.release_at) return -1;
                if (a.release_at < b.release_at) return 1;
                return 0;
            });

            const pages = helpers.fetchedPages(state.fetchedPages, payload.request.responseURL);

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
                total: state.total ? state.total : payload.data.total,
                fetchedPages: pages,
            });
        case actionTypeStatus(games.fetch_list, 'error'):
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                } 
            });
        case actionTypeStatus(games.delete, 'pending'):
            return Object.assign({}, state, { isFetching: true, error: null });
        case actionTypeStatus(games.delete, 'success'):
            let list = state.items;
            let index = list.findIndex(v => v._id == payload.data);
            
            list.splice(index, 1);
            state.total--;

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: list,
            });
        case actionTypeStatus(games.delete, 'error'):
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