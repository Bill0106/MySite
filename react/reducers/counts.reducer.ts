import helpers from '../helpers';

export default function reducer(state = helpers.initialState, action) {
    const { actionStatusGenerator } = helpers;
    const { counts } = helpers.actionTypes;
    const { type, payload } = action;
    const types = actionStatusGenerator(counts);
    
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