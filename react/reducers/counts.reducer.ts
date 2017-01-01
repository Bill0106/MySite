import { actionTypeGenerator } from '../helpers';

const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    error: null,
}

export default function reducer(state = initialState, action) {
    const types = actionTypeGenerator('counts', 'fetch');
    const { type, payload } = action;
    
    switch (type) {
        case types('pending'):
            return Object.assign({}, state, { isFetching: true, error: null });
        case types('success'):
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: Array.isArray(payload) ? payload : payload.data
            });
        case types('error'):
            const { data, status } = payload.response;

            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}