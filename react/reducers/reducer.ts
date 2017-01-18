import { combineReducers } from 'redux';

const pending = (state, posting = false) => {
    if (posting) {
        return Object.assign({}, state, { isPosting: true, posted: false, error: null });
    } else {
        return Object.assign({}, state, { isFetching: true, fetched: false, error: null });
    }
};

const error = (state, payload, posting = false) => {
    const { status, data } = payload.response;

    if (posting) {
        return Object.assign({}, state, {
            isPosting: false,
            error: { status, data },
        });
    } else {
        return Object.assign({}, state, {
            isFetching: false,
            error: { status, data },
        });
    }
};

const fetchedPages = (pages: any, url: string) => {
    const urlArray = url.split('?');
    const query = urlArray[1].split('&');
    const queryObj = {};

    query.map(value => {
        const pair = value.split('=');
        queryObj[pair[0]] = pair[1];
    });

    if (queryObj.hasOwnProperty('ids') || queryObj.hasOwnProperty('active')) {
        return pages;
    }

    const page = queryObj['page'] ? parseInt(queryObj['page']) : 1;

    pages.push(page);
    pages.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    return pages;
};

const formatItems = (data, addon, sort) => {
    const items = data;
    for (let item of addon) {
        if (items.findIndex(e => e._id === item._id) < 0) {
            items.push(item);
        }
    }

    if (items.length > 1) {
        items.sort(sort);
    }

    return items;
};

class Reducer {
    private state: any;
    private action: any;
    private types: any;
    private sort: any;

    constructor(state, action, types, sort) {
        this.state = state;
        this.action = action;
        this.types = types;
        this.sort = sort;
    }

    actionStatusGenerator(property: string = null) {
        let newTypes = {};
        const types = this.types;
        const progress = {
            pending: 'PENDING',
            success: 'FULFILLED',
            error: 'REJECTED',
        };

        if (property) {
            for (let key in progress) {
                newTypes[key] = `${types[property]}_${progress[key]}`;
            }

            return newTypes;
        }

        for (let type in types) {
            let obj = {};
            for (let key in progress) {
                obj[key] = `${types[type]}_${progress[key]}`;
            }
            newTypes[type] = obj;
        }

        return newTypes;
    }

    fetchListReducer() {
        const { type, payload } = this.action;
        const types = this.actionStatusGenerator('fetch_list');
        const state = this.state;
        const sort = this.sort;

        switch (type) {
            case types['pending']:
                return pending(state);
            case types['error']:
                return error(state, payload);
            case types['success']:
                return Object.assign({}, state, {
                    isFetching: false,
                    fetched: true,
                    items: formatItems(state, payload.data.list, sort),
                    total: state.total ? state.total : payload.data.total,
                    fetchedPages: fetchedPages(state.fetchedPages, payload.request.responseURL),
                });
            default:
                return state;
        }
    }

    fetchItemReducer() {
        const { type, payload } = this.action;
        const types = this.actionStatusGenerator('fetch_item');
        const state = this.state;
        const sort = this.sort;

        switch (type) {
            case types['pending']:
                return pending(state);
            case types['error']:
                return error(state, payload);
            case types['success']:
                return Object.assign({}, state, {
                    isFetching: false,
                    fetched: true,
                    items: formatItems(state.items, [payload.data], sort),
                });
            default:
                return state;
        }
    }

    postItemReducer() {
        const { type, payload } = this.action;
        const types = this.actionStatusGenerator('post');
        const state = this.state;
        const sort = this.sort;

        switch (type) {
            case types['pending']:
                return pending(state, true);
            case types['error']:
                return error(state, payload, true);
            case types['success']:
                return Object.assign({}, state, {
                    isFetching: false,
                    fetched: true,
                    items: formatItems(state.items, [payload.data], sort),
                });
            default:
                return state;
        }
    }

    deleteItemReducer() {
        const { type, payload } = this.action;
        const types = this.actionStatusGenerator('delete');
        const state = this.state;
        const sort = this.sort;
        const { items } = state;

        switch (type) {
            case types['pending']:
                return pending(state);
            case types['error']:
                return error(state, payload);
            case types['success']:
                const index = items.findIndex(v => v._id === payload.data);

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

    combinedReducers() {
        const fetchList = this.fetchListReducer();
        const fetchItem = this.fetchItemReducer();
        const postItem = this.postItemReducer();
        const deleteItem = this.deleteItemReducer();

        return combineReducers({ fetchList, fetchItem, postItem, deleteItem });
    }
}

export default Reducer;