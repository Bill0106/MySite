import axios from 'axios';
import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/action-types.constants';

const { hearthstone_seasons } = actionTypes;

export const fetchSeasons = createAction(hearthstone_seasons.fetch_list, (page = null) => {
    let url = `/hearthstone-seasons?limit=30${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
export const fetchSeason = createAction(hearthstone_seasons.fetch_item, (url: string) => axios.get('/hearthstone-seasons/' + url));
export const createSeason = createAction(hearthstone_seasons.post, (season: any) => axios.post('/hearthstone-seasons/', season));
export const updateSeason = createAction(hearthstone_seasons.post, (season: any, url: string) => axios.post('/hearthstone-seasons/' + url, season));
export const deleteSeason = createAction(hearthstone_seasons.post, (url: string) => axios.post('/hearthstone-seasons/' + url + '/delete'));