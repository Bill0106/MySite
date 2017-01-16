import axios from 'axios';
import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/action-types.constants';

const { games } = actionTypes;

const fetchGames = createAction(games.fetch_list, (page = null) => {
    let url = `/games?limit=30${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
const fetchGame = createAction(games.fetch_item, (url: string) => axios.get('/games/' + url));
const createGame = createAction(games.post, (game: any) => axios.post('/games', game));
const updateGame = createAction(games.post, (game: any, params: any) => axios.post('/games/' + params.url, game));
const deleteGame = createAction(games.delete, (url) => axios.post('/games/' + url + '/delete'));

export { fetchGames, fetchGame, createGame, updateGame, deleteGame };