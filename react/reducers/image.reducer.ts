import helpers from '../helpers';
import { actionTypes } from '../constants';

const initialState = {
    isPosting: false,
    posted: false,
    image: null,
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    const { image } = actionTypes;
    const types = helpers.actionStatusGenerator(image);
    
    switch (type) {
        case image.init:
            return Object.assign({}, state, initialState)
        case types['post'].pending:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case types['post'].success:
            const { url, color } = payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                image: { url, color }
            })
        case types['post'].error:
            const { status, data } = payload.response;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: { status, data }
            });
        default:
            return state;
    }
}