import { createAction } from "redux-actions";
import { actionTypes } from "../constants/action-types.constants";

const { item } = actionTypes;

export const initItemCreate = createAction(item.init);
export const setItem = createAction(item.set);
export const changeItem = createAction(item.change);