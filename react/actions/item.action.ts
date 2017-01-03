import { createAction } from 'redux-actions';
import helpers from '../helpers';

const { item } = helpers.actionTypes;

export const initItemCreate = createAction(item.init);

export const setItem = createAction(item.set);

export const changeItem = createAction(item.change);