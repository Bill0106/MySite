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
    if (a.buy_at > b.buy_at) return -1;
    if (a.buy_at < b.buy_at) return 1;
    if (a.release_at > b.release_at) return -1;
    if (a.release_at < b.release_at) return 1;
    return 0;
}

const reducer = (state = initialState, action) => reducerSwitch(state, action, actionTypes.games, sort)

export default reducer