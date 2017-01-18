import { createAction } from 'redux-actions';
import axios from 'axios';
import actionTypes from '../constants/action-types.constants';

const { hearthstone_decks } = actionTypes;

const fetchDecks = createAction(hearthstone_decks.fetch_list, (params: any) => {
    const base = '/hearthstone-decks';
    let url = `${base}?limit=30`;

    if (params.hasOwnProperty('page') && params.page) {
        url = `${url}&page=${params.page}`;
    } else if (params.hasOwnProperty('ids')) {
        url = `${base}?ids=${params.ids.join(',')}`;
    } else if (params.hasOwnProperty('active')) {
        url = `${base}?active=${params.active}`;
    }

    return axios.get(url);
});
const fetchDeck = createAction(hearthstone_decks.fetch_item, (id: string) => axios.get('/hearthstone-decks/' + id));
const createDeck = createAction(hearthstone_decks.post, (deck: any) => axios.post('/hearthstone-decks/', deck));
const updateDeck = createAction(hearthstone_decks.post, (deck: any, id: string) => axios.post('/hearthstone-decks/' + id, deck));
const deleteDeck = createAction(hearthstone_decks.post, (id: string) => axios.post('/hearthstone-decks/' + id + '/delete'));
const activeDeck = createAction(hearthstone_decks.active, (id: string) => axios.post('/hearthstone-decks/' + id + '/active'));
const inactiveDeck = createAction(hearthstone_decks.inactive, (id: string) => axios.post('/hearthstone-decks/' + id + '/inactive'));

export { fetchDecks, fetchDeck, createDeck, updateDeck, deleteDeck, activeDeck, inactiveDeck }