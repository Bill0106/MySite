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

export function fetchSeason(url: string) {
    return {
        type: 'FETCH_HEARTHSTONE_SEASON',
        payload: axios.get('/hearthstone-seasons/' + url)
    }
}

export function initSeasonCreate() {
    return {
        type: 'INIT_HEARTHSTONE_CREATE'
    }
}

export function createSeason(season: any) {
    return {
        type: 'POST_HEARTHSTONE_SEASON',
        payload: axios.post('/hearthstone-seasons/', season)
    }
}

export function updateSeason(season: any) {
    return {
        type: 'POST_HEARTHSTONE_SEASON',
        payload: axios.post('/hearthstone-seasons/' + season.url, season)
    }
}

export function deleteSeason(url: string) {
    return {
        type: 'DELETE_HEARTHSTONE_SEASON',
        payload: axios.post('/hearthstone-seasons/' + url + '/delete')
    }
}

export function changField(field: string, value: any) {
    return {
        type: 'CHANGE_FIELD',
        payload: { field, value }
    }
}