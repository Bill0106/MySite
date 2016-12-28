import axios from 'axios';
import store from '../store';

export function fetchGourmets(page: number) {
    let url = '/gourmets?limit=30';
    if (page) {
        url = `${url}&page=${page}`;
    }

    return {
        type: 'FETCH_GOURMETS',
        payload: axios.get(url)
    }
}

export function fetchGourmet(id: string) {
    const state = store.getState();
    const gourmets = state['gourmets'];
    const gourmet = state['gourmet'];

    if (gourmet.fetched && gourmet.item._id == id) {
        return {
            type: 'FETCH_GOURMET_FULFILLED',
            payload: gourmet.item
        }
    }

    if (gourmets.fetched && gourmets.items.length) {
        const item = gourmets.items.find(v => v._id == id);
        if (item) {
            return {
                type: 'FETCH_GOURMET_FULFILLED',
                payload: item
            }
        }
    }

    return {
        type: 'FETCH_GOURMET',
        payload: axios.get('/gourmets/' + id)
    }
}

export function initGourmetCreate() {
    return {
        type: 'INIT_GOURMET_CREATE'
    }
}

export function createGourmet(gourmet: any) {
    return {
        type: 'POST_GOURMET',
        payload: axios.post('/gourmets/', gourmet)
    }
}

export function updateGourmet(gourmet: any) {
    return {
        type: 'POST_GOURMET',
        payload: axios.post('/gourmets/' + gourmet._id, gourmet)
    }
}

export function deleteGourmet(id: string) {
    return {
        type: 'DELETE_GOURMET',
        payload: axios.post('/gourmets/' + id + '/delete')
    }
}

export function changField(field: string, value: any) {
    return {
        type: 'CHANGE_FIELD',
        payload: { field, value }
    }
}