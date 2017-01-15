import { applyMiddleware, createStore } from "redux"
import * as logger from "redux-logger"
import promise from "redux-promise-middleware"
import thunk from "redux-thunk"

import reducer from "./reducers"

const middleware = applyMiddleware(logger(), thunk, promise())

export default createStore(reducer, middleware)