import { createAction } from 'redux-actions';
import actionTypes from '../constants/action-types.constants';

const { item } = actionTypes;

const initItemCreate = createAction(item.init);
const setItem = createAction(item.set);
const changeItem = createAction(item.change);

export { initItemCreate, setItem, changeItem }