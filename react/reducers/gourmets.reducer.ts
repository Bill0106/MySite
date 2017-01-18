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
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
};

const reducer = (state = initialState, action) => {
    const reducer = new Reducer(state, action, actionTypes.gourmets, sort);
    return reducer.combinedReducers();
};

export default reducer;