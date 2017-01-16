import { createAction } from 'redux-actions';
import axios from 'axios';
import actionTypes from '../constants/action-types.constants';

const { hearthstone_seasons } = actionTypes;

const fetchSeasons = createAction(hearthstone_seasons.fetch_list, (page = null) => {
    let url = `/hearthstone-seasons?limit=30${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
const fetchSeason = createAction(hearthstone_seasons.fetch_item, (url: string) => axios.get('/hearthstone-seasons/' + url));
const createSeason = createAction(hearthstone_seasons.post, (season: any) => axios.post('/hearthstone-seasons/', season));
const updateSeason = createAction(hearthstone_seasons.post, (season: any, url: string) => axios.post('/hearthstone-seasons/' + url, season));
const deleteSeason = createAction(hearthstone_seasons.post, (url: string) => axios.post('/hearthstone-seasons/' + url + '/delete'));

export { fetchSeasons, fetchSeason, createSeason, updateSeason, deleteSeason }