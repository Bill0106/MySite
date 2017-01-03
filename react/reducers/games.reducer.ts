import helpers from '../helpers';

const sort = (a, b) => {
    if (a.buy_at > b.buy_at) return -1;
    if (a.buy_at < b.buy_at) return 1;
    if (a.release_at > b.release_at) return -1;
    if (a.release_at < b.release_at) return 1;
    return 0;
}

export default function reducer(state = helpers.initialState, action) {
    const { actionStatusGenerator } = helpers;
    const { games } = helpers.actionTypes;
    const { type, payload } = action;
    const types = actionStatusGenerator(games);

    let newSet, items, index;

    switch (type) {
        // Fetch List
        case types['fetch_list'].pending:
            return Object.assign({}, state, { isFetching: true, fetched: false, error: null });
        case types['fetch_list'].success:
            newSet = new Set(state.items.concat(payload.data.list));
            items = Array.from(newSet)
            items.sort(sort);

            const pages = helpers.fetchedPages(state.fetchedPages, payload.request.responseURL);

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
                total: state.total ? state.total : payload.data.total,
                fetchedPages: pages,
            });
        case types['fetch_list'].error:
            return Object.assign({}, state, {
                isFetching: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        // Fetch Item
        case types['fetch_item'].pending:
            return Object.assign({}, state, { isFetching: true, fetched: false, error: null });
        case types['fetch_item'].success:
            state.items.push(payload.data);
            newSet = new Set(state.items);
            items = Array.from(newSet);

            if (items.length > 1) {
                items.sort(sort);
            }

            return Object.assign({}, state, {
                isFetching: false,
                items: items,
            });
        case types['fetch_item'].error:
            return Object.assign({}, state, {
                isFetching: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        // Post Item
        case types['post'].pending:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case types['post'].success:
            items = state.items;
            index = items.findIndex(v => v._id == payload.data._id);

            if (index < 0) {
                state.items.push(payload.data);
                if (items.length > 1) {
                    items.sort(sort);
                }
                state.total++;
            } else {
                items = items.slice(index, 1, payload.data);
            }

            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: items,
            })
        case types['post'].error:
            return Object.assign({}, state, {
                isPosting: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        // Delete Item
        case types['delete'].pending:
            return Object.assign({}, state, { isFetching: true, error: null });
        case types['delete'].success:
            items = state.items;
            index = items.findIndex(v => v._id == payload.data);

            items.splice(index, 1);
            state.total--;

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
            });
        case types['delete'].error:
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