import axios from 'axios';

export function fetchCounts() {
    return {
        type: 'FETCH_COUNTS',
        payload: axios.get('/counts')
    }
}