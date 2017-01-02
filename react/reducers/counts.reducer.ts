import helpers from '../redux-helpers';

export default function reducer(state = helpers.initialState, action) {
    const { actionTypeStatus } = helpers;
    const { counts } = helpers.actionTypes;
    const { type, payload } = action;
    
    switch (type) {
        case actionTypeStatus(counts.fetch_list, 'pending'):
            return Object.assign({}, state, { isFetching: true, error: null });
        case actionTypeStatus(counts.fetch_list, 'success'):
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: Array.isArray(payload) ? payload : payload.data
            });
        case actionTypeStatus(counts.fetch_list, 'error'):
            const { data, status } = payload.response;

            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}