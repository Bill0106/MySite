import reducerSwitch from './reducer';
import { actionTypes } from '../constants';

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

export default function reducer(state = initialState, action) {
    const sort = (a, b) => {
        if (a.month > b.month) return -1;
        if (a.month < b.month) return 1;
        return 0;
    }

    return reducerSwitch(state, action, actionTypes.hearthstone_seasons, sort);
}