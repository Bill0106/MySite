import { applyMiddleware, createStore } from "redux";
import * as logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import reducer from "./reducers";

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

const middleware = applyMiddleware(logger(), thunk, promise());

export default createStore(reducer, middleware);