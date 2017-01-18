import Reducer from './reducer';
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

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    const reducer = new Reducer(state, action, actionTypes.hearthstone_decks, sort);
    const activeTypes = reducer.actionStatusGenerator('active');
    const inactiveTypes = reducer.actionStatusGenerator('inactive');

    switch (type) {
        case activeTypes['pending']:
        case inactiveTypes['pending']:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case activeTypes['error']:
        case inactiveTypes['error']:
            const { status, data } = payload.response;
            return Object.assign({}, state, { isPosting: false, error: { status, data } });
        case activeTypes['success']:
        case inactiveTypes['success']:
            const items = state.items;
            let item = state.items.find(v => v._id === payload.data);

            if (item) {
                item.active = !item.active;
                items.sort(sort);
            }

            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: items,
            });
        default:
            break;
    }

    return reducer.combinedReducers();
};

export default reducer;