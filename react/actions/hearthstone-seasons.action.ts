import axios from 'axios';

export function fetchSeasons(page: number = null) {
    let url = '/hearthstone-seasons?limit=30';
    if (page) {
        url = `${url}&page=${page}`;
    }

    return {
        type: 'FETCH_HEARTHSTONE_SEASONS',
        payload: axios.get(url)
    }
}

export function deleteSeason(url: string) {
    return {
        type: 'DELETE_HEARTHSTONE_SEASON',
        payload: axios.post('/hearthstone-seasons/' + url + '/delete')
    }
}