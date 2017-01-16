import axios from 'axios';
import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/action-types.constants';

const { games } = actionTypes;

export const fetchGames = createAction(games.fetch_list, (page = null) => {
    let url = `/games?limit=30${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
export const fetchGame = createAction(games.fetch_item, (url: string) => axios.get('/games/' + url));
export const createGame = createAction(games.post, (game: any) => axios.post('/games', game));
export const updateGame = createAction(games.post, (game: any, params: any) => axios.post('/games/' + params.url, game));
export const deleteGame = createAction(games.delete, (url) => axios.post('/games/' + url + '/delete'));