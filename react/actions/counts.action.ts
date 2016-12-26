import axios from 'axios';
import store from '../store';

export function fetchCounts() {
    const state = store.getState();
    const counts = state['counts'];

    if (counts.fetched) {
        return {
            type: 'FETCH_COUNTS_FULFILLED',
            payload: counts.items
        }
    } else {
        return {
            type: 'FETCH_COUNTS',
            payload: axios.get('/counts')
        }
    }
}