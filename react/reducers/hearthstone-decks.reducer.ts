import reducerSwitch from './reducer';
import helpers from '../helpers';
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
    const { actionStatusGenerator } = helpers;
    const { type, payload } = action;
    const types = actionStatusGenerator(actionTypes.hearthstone_decks);
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

    let item, list;

    switch (type) {
        case types['active'].pending:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case types['active'].success:
            list = state.items;
            item = list.find(v => v._id == payload.data);

            if (item) {
                item.active = true;
                list.sort(sort);
            }

            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: list,
            });
        case types['active'].error:
            return Object.assign({}, state, {
                isPosting: false,
                error: {
                    status: payload.response.status,
                    data: payload.response.data
                }
            });
        case types['inactive'].pending:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case types['inactive'].success:
            list = state.items;
            item = list.find(v => v._id == payload.data);

            if (item) {
                item.active = false;
                list.sort(sort);
            }

            return Object.assign({}, state, {
                isPosting: false,
                posted: true,
                items: list,
            });
        case types['inactive'].error:
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