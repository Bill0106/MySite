import axios from 'axios';

export function fetchDecks(page: number = null, options: any = {}) {
    let url = '/hearthstone-decks';

    if (options.hasOwnProperty('ids') && Array.isArray(options.ids)) {
        const ids = options.ids.join(',');
        url = `${url}?ids=${ids}`;
    } else if (options.hasOwnProperty('active')) {
        url = `${url}?active=${options.active}`;
    } else {
        url = page ? `${url}?limit=30&page${page}` : `${url}?limit=30`;
    }

    return {
        type: 'FETCH_HEARTHSTONE_DECKS',
        payload: axios.get(url)
    }
}

export function deleteDeck(id: string) {
    return {
        type: 'DELETE_HEARTHSTONE_DECK',
        payload: axios.post('/hearthstone-decks/' + id + '/delete')
    }
}