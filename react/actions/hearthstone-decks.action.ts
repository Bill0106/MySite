import axios from 'axios';
import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/action-types.constants';

const { hearthstone_decks } = actionTypes;

export const fetchDecks = createAction(hearthstone_decks.fetch_list, (page: number = null) => {
    let url = `/hearthstone-decks?limit=30${page ? '&page=' + page : ''}`;
    return axios.get(url);
});
export const fetchDeck = createAction(hearthstone_decks.fetch_item, (id: string) => axios.get('/hearthstone-decks/' + id));
export const createDeck = createAction(hearthstone_decks.post, (deck: any) => axios.post('/hearthstone-decks/', deck));
export const updateDeck = createAction(hearthstone_decks.post, (deck: any, id: string) => axios.post('/hearthstone-decks/' + id, deck));
export const deleteDeck = createAction(hearthstone_decks.post, (id: string) => axios.post('/hearthstone-decks/' + id + '/delete'));
export const activeDeck = createAction(hearthstone_decks.active, (id: string) => axios.post('/hearthstone-decks/' + id + '/active'));
export const inactiveDeck = createAction(hearthstone_decks.inactive, (id: string) => axios.post('/hearthstone-decks/' + id + '/inactive'));