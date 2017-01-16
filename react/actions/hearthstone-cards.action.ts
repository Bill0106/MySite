import { createAction } from 'redux-actions';
import axios from 'axios';
import actionTypes from '../constants/action-types.constants';

const fetchCards = createAction(actionTypes.hearthstone_cards.fetch_list, (params: any) => {
    let url = '/hearthstone-cards/?standard=true';

    if (typeof params !== 'object') {
        return axios.get(url + '&playerClass=-1');
    }

    if (params.hasOwnProperty('playerClass')) {
        url = `${url}&playerClass=${params.playerClass}`;
        if (params.playerClass === -1) {
            url = `${url}&cost=${params.hasOwnProperty('cost') ? params.cost : 1}`;
        }
    } else if (params.hasOwnProperty('ids')) {
        url = `${url}&ids=${params.ids.join(',')}`;
    } else {
        url = `${url}&playerClass=-1`;
    }

    return axios.get(url);
});

export { fetchCards }