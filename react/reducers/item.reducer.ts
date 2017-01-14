import helpers from '../helpers';
import { actionTypes } from '../constants/action-types.constants';

export default function reducer(state = { data: null }, action) {
    const { item } = actionTypes;
    const { type, payload } = action;

    switch (type) {
        case item.init:
            return Object.assign({}, state, { data: null });
        case item.set:
            return Object.assign({}, state, { data: payload });
        case item.change:
            const { field, value } = payload;
            let data = state.data;
            data[field] = value;
            return Object.assign({}, state, { data: data });
        default:
            return state;
    }
}