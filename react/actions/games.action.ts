import axios from 'axios';

import store from '../store';

export function fetchGames(page: number = null) {
    let url = '/games?limit=20';
    if (page) {
        url = url + '&page=' + page;
    }

    return {
        type: 'FETCH_GAMES',
        payload: axios.get(url)
    }
}

export function fetchGame(url: string) {
    // const state = store.getState();
    // const games = state['games'].items;
    // const game = state['game'].item;
    // console.log(games);

    return {
        type: 'FETCH_GAME',
        payload: axios.get('/games/' + url)
    }
}

export function deleteGame(url: string) {
    return {
        type: 'DELETE_GAME',
        payload: axios.post('/games/' + url + '/delete')
    }
}