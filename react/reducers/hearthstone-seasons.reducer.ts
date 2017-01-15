import reducerSwitch from "./reducer"
import { actionTypes } from "../constants/action-types.constants"

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

const sort = (a, b) => {
    if (a.month > b.month) return -1
    if (a.month < b.month) return 1
    return 0
}

const reducer = (state = initialState, action) => reducerSwitch(state, action, actionTypes.hearthstone_seasons, sort)

export default reducer