import { createAction } from 'redux-actions';
import axios from 'axios';
import actionTypes from '../constants/action-types.constants';

const { hearthstone_matches } = actionTypes;

const fetchMatches = createAction(hearthstone_matches.fetch_list, (page = null) => {
    const url = `/hearthstone-matches?limit=100${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
const createMatch = createAction(hearthstone_matches.post, (match: any) => axios.post('/hearthstone-matches/', match));
const deleteMatch = createAction(hearthstone_matches.delete, (id: string) => axios.post('/hearthstone-matches/' + id + '/delete'));

export { fetchMatches, createMatch, deleteMatch }