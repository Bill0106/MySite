import { actionTypes } from '../constants/action-types.constants';

const initialState = {
    isPosting: false,
    posted: false,
    image: null,
    error: null,
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    const { image } = actionTypes;

    switch (type) {
        case image.init:
            return Object.assign({}, state, initialState);
        case `${actionTypes.image.post}_PENDING`:
            return Object.assign({}, state, { isPosting: true, posted: false, error: null });
        case `${actionTypes.image.post}_FULFILLED`:
            const { url, color } = payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                image: { url, color },
            });
        case `${actionTypes.image.post}_REJECTED`:
            const { status, data } = payload.response;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: { status, data },
            });
        default:
            return state;
    }
}