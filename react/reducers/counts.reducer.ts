import { actionTypes } from '../constants/action-types.constants';

const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case `${actionTypes.counts.fetch_list}_PENDING`:
            return Object.assign({}, state, { isFetching: true, error: null });
        case `${actionTypes.counts.fetch_list}_FULFILLED`:
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: Array.isArray(payload) ? payload : payload.data
            });
        case `${actionTypes.counts.fetch_list}_REJECTED`:
            const { data, status } = payload.response;
            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}