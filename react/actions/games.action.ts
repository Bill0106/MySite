import axios from 'axios';

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

export function changField(field, value) {
    return {
        type: 'CHANGE_FIELD',
        payload: { field, value }
    }
}