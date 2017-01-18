import reducerSwitch from './reducer';
import actionTypes from '../constants/action-types.constants';

const initialState = {
    isFetching: false,
    fetched: false,
    isPosting: false,
    posted: false,
    items: [],
    total: 0,
    fetchedPages: [],
    error: null,
};

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
};

const pending = (state) => {
    return Object.assign({}, state, { isPosting: true, posted: false, error: null });
};

const fulfilled = (state, payload, active = false) => {
    let items = state.items;
    let item = state.items.find(v => v._id === payload.data);

    if (item) {
        item.active = active;
        items.sort(sort);
    }

    return Object.assign({}, state, {
        isPosting: false,
        posted: true,
        items: items,
    });
};

const error = (state, payload) => {
    const { status, data } = payload.response;

    return Object.assign({}, state, {
        isPosting: false,
        error: { status, data },
    });
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case `${actionTypes.hearthstone_decks.active}_PENDING`:
            return pending(state);
        case `${actionTypes.hearthstone_decks.active}_FULFILLED`:
            return fulfilled(state, payload, true);
        case `${actionTypes.hearthstone_decks.active}_REJECTED`:
            return error(state, payload);

        case `${actionTypes.hearthstone_decks.inactive}_PENDING`:
            return pending(state);
        case `${actionTypes.hearthstone_decks.inactive}_FULFILLED`:
            return fulfilled(state, payload);
        case `${actionTypes.hearthstone_decks.inactive}_REJECTED`:
            return error(state, payload);

        default:
            break;
    }

    return reducerSwitch(state, action, actionTypes.hearthstone_decks, sort);
};

export default reducer;