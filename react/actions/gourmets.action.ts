import axios from 'axios';

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

export function deleteGourmet(id: string) {
    return {
        type: 'DELETE_GOURMET',
        payload: axios.post('/gourmets/' + id + '/delete')
    }
}