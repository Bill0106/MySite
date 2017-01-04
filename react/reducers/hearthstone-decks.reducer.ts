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
        const aActive = Boolean(a.active);
        const bActive = Boolean(b.active);
        if (aActive > bActive) return -1;
        if (aActive < bActive) return 1;
        if (a.playerClass > b.playerClass) return  1;
        if (a.playerClass < b.playerClass) return  -1;
        if (a.name > b.name) return  1;
        if (a.name < b.name) return  -1;
        return 0;
    }

    return reducerSwitch(state, action, actionTypes.hearthstone_decks, sort);
}