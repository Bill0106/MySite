import axios from 'axios';
import store from '../store';

export function fetchGames(page: number = null) {
    let url = '/games?limit=30';
    if (page) {
        url = `${url}&page=${page}`;
    }

    return {
        type: 'FETCH_GAMES',
        payload: axios.get(url)
    }
}

export function fetchGame(url: string) {
    const state = store.getState();
    const games = state['games'];
    const game = state['game'];

    if (game.fetched && game.item.url == url) {
        return {
            type: 'FETCH_GAME_FULFILLED',
            payload: game.item
        }
    }

    if (games.fetched && games.items.length) {
        const item = games.items.find(v => v.url == url);
        if (item) {
            return {
                type: 'FETCH_GAME_FULFILLED',
                payload: item
            }
        }
    }

    return {
        type: 'FETCH_GAME',
        payload: axios.get('/games/' + url)
    }
}

export function initGameCreate() {
    return {
        type: 'INIT_GAME_CREATE'
    }
}

export function createGame(game: any) {
    return {
        type: 'POST_GAME',
        payload: axios.post('/games/', game)
    }
}

export function updateGame(game: any) {
    return {
        type: 'POST_GAME',
        payload: axios.post('/games/' + game.url, game)
    }
}

export function deleteGame(url: string) {
    return {
        type: 'DELETE_GAME',
        payload: axios.post('/games/' + url + '/delete')
    }
}

export function changField(field: string, value: any) {
    return {
        type: 'CHANGE_FIELD',
        payload: { field, value }
    }
}