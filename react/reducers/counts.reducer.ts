import helpers from '../helpers';
import { actionTypes } from '../constants/action-types.constants';

const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    error: null,
}

export default function reducer(state = initialState, action) {
    const { actionStatusGenerator } = helpers;
    const { type, payload } = action;
    const types = actionStatusGenerator(actionTypes.counts);
    
    switch (type) {
        case types['fetch_list'].pending:
            return Object.assign({}, state, { isFetching: true, error: null });
        case types['fetch_list'].success:
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: Array.isArray(payload) ? payload : payload.data
            });
        case types['fetch_list'].error:
            const { data, status } = payload.response;

            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}