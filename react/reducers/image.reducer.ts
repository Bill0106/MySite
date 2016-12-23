const initialState = {
    isFetching: false,
    fetched: false,
    image: null,
    error: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'INIT_IMAGE':
            return Object.assign({}, state, initialState)
        case 'UPLOAD_IMAGE_PENDING':
            return Object.assign({}, state, { isFetching: true, error: null });
        case 'UPLOAD_IMAGE_FULFILLED':
            const { url, color } = payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                image: { url, color }
            })
        case 'UPLOAD_IMAGE_REJECTED':
            return Object.assign({}, state, {
                isFetching: false,
                fetched: false,
                error: {
                    statue: payload.response.status,
                    data: payload.response.data
                }
            });
        default:
            return state;
    }
}