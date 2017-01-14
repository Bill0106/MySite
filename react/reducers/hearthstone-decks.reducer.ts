import reducerSwitch from './reducer';
import { actionTypes } from '../constants/action-types.constants';

const initialState = {
    isFetching: false,
    fetched: false,
    isPosting: false,
    posted: false,
    items: [],
    total: 0,
    fetchedPages: [],
    error: null,
}

const sort = (a, b) => {
    const aActive = Boolean(a.active);
    const bActive = Boolean(b.active);
    if (aActive > bActive) return -1;
    if (aActive < bActive) return 1;
    if (a.playerClass > b.playerClass) return 1;
    if (a.playerClass < b.playerClass) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

const changeItem = function (data, id, active = false) {
    let items = data;
    let item = items.find(v => v._id == id);

    if (item) {
        item.active = active;
        items.sort(sort);
    }

    return items;
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    const pending = Object.assign({}, state, { isPosting: true, posted: false, error: null });

    switch (type) {
        case `${actionTypes.hearthstone_decks.active}_PENDING`:
            return pending;
        case `${actionTypes.hearthstone_decks.active}_FULFILLED`:
            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: changeItem(state.items, payload.data, true)
            });
        case `${actionTypes.hearthstone_decks.active}_REJECTED`:
            return Object.assign({}, state, {
                isPosting: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        case `${actionTypes.hearthstone_decks.inactive}_PENDING`:
            return pending;
        case `${actionTypes.hearthstone_decks.inactive}_FULFILLED`:
            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: changeItem(state.items, payload.data)
            });
        case `${actionTypes.hearthstone_decks.inactive}_REJECTED`:
            return Object.assign({}, state, {
                isPosting: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        default:
            break;
    }

    return reducerSwitch(state, action, actionTypes.hearthstone_decks, sort);
}