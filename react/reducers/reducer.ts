const actionStatusGenerator = (types: any) => {
    const progress = {
        pending: 'PENDING',
        success: 'FULFILLED',
        error: 'REJECTED',
    };

    let newTypes = {};
    for (let type in types) {
        let obj = {};
        for (let key in progress) {
            obj[key] = `${types[type]}_${progress[key]}`;
        }
        newTypes[type] = obj;
    }

    return newTypes;
}

const fetchedPages = (pages: any, url: string) => {
    const match = url.match(/page=(\d)/i);
    const page = match ? parseInt(match[1]) : 1;

    pages.push(page);
    pages.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    return pages;
}

const formatItems = (data, addon, sort) => {
    let items = data;
    for (let item of addon) {
        if (items.findIndex(e => e._id == item._id) < 0) {
            items.push(item);
        }
    }

    if (items.length > 1) {
        items.sort(sort);
    }

    return items;
}

const pending = (state, posting = false) => {
    if (posting) {
        return Object.assign({}, state, { isPosting: true, posted: false, error: null });
    } else {
        return Object.assign({}, state, { isFetching: true, fetched: false, error: null });
    }
}

const error = (state, payload, posting = false) => {
    const { status, data } = payload.response;

    if (posting) {
        return Object.assign({}, state, {
            isPosting: false,
            error: { status, data }
        });
    } else {
        return Object.assign({}, state, {
            isFetching: false,
            error: { status, data }
        });
    }
}

const reducerSwitch = (state, action, typeConstants, sort) => {
    const { type, payload } = action;
    const { items } = state;
    const types = actionStatusGenerator(typeConstants);

    let newSet, index;

    switch (type) {
        // Fetch List
        case types['fetch_list'].pending:
            return pending(state);
        case types['fetch_list'].error:
            return error(state, payload);
        case types['fetch_list'].success:
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: formatItems(state.items, payload.data.list, sort),
                total: state.total ? state.total : payload.data.total,
                fetchedPages: fetchedPages(state.fetchedPages, payload.request.responseURL),
            });

        // Fetch Item
        case types['fetch_item'].pending:
            return pending(state);
        case types['fetch_item'].error:
            return error(state, payload);
        case types['fetch_item'].success:
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: formatItems(state.items, [payload.data], sort),
            });

        // Post Item
        case types['post'].pending:
            return pending(state, true);
        case types['post'].error:
            return error(state, payload, true);
        case types['post'].success:
            index = items.findIndex(v => v._id == payload.data._id);

            if (index < 0) {
                items.push(payload.data);
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

        // Delete Item
        case types['delete'].pending:
            return pending(state, true);
        case types['delete'].error:
            return error(state, payload, true);
        case types['delete'].success:
            index = items.findIndex(v => v._id == payload.data);

            if (index > -1) {
                items.splice(index, 1);
                state.total--;
            }

            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: items,
            });

        default:
            return state;
    }
}

export default reducerSwitch;