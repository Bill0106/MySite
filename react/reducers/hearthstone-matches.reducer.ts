import { combineReducers } from 'redux';
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
    addedItems: [],
    error: null,
};

const sort = (a, b) => {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
};

const postItemReducer = (state, action, types) => {
    const { type, payload } = action;

    switch (type) {
        case types.pending:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case types.error:
            const { status, data } = payload.response;
            return Object.assign({}, state, { isPosting: false, error: { status, data } });
        case types.success:
            const { items, addedItems } = state;

            items.push(payload.data);
            if (items.length > 1) items.sort(sort);
            addedItems.push(payload.data);
            if (addedItems.length > 1) addedItems.sort(sort);

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
                addedItems: addedItems,
            });
        default:
            return state;
    }
};

const reducer = (state = initialState, action) => {
    const reducer = new Reducer(state, action, actionTypes.hearthstone_matches, sort);
    const postTypes = reducer.actionStatusGenerator('post');
    const fetchList = reducer.fetchListReducer();
    const deleteItem = reducer.deleteItemReducer();
    const postItem = postItemReducer(state, action, postTypes);

    return combineReducers({ fetchList, postItem, deleteItem });
};

export default reducer;