import helpers from '../helpers';
import { actionTypes } from '../constants/action-types.constants';

const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    fetchedCosts: [],
    fetchedPlayerClasses: [],
    error: null,
} 

export default function reducer(state = initialState, action) {
    const { actionStatusGenerator } = helpers;
    const { type, payload } = action;
    const types = actionStatusGenerator(actionTypes.hearthstone_cards);

    switch (type) {
        case types['fetch_list'].pending:
            return Object.assign({}, state, { isFetching: true, fetched: false, error: null });
        case types['fetch_list'].success:
            const { items, fetchedCosts, fetchedPlayerClasses } = state;

            for (let item of payload.data) {
                if (items.findIndex(e => e._id == item._id) < 0) {
                    items.push(item);
                }
            }

            const playerClass = payload.data[0].playerClass;
            let cost = payload.data[0].cost;

            if (playerClass != -1 && fetchedPlayerClasses.indexOf(playerClass) < 0 && payload.data.every(e => e.playerClass == playerClass)) {
                fetchedPlayerClasses.push(playerClass);
            }

            if (playerClass == -1 && fetchedCosts.indexOf(cost) < 0) {
                let every = false;

                if (cost <= 1) {
                    cost = 1;
                    every = payload.data.every(e => e.cost <= cost);
                } else if (cost >= 7) {
                    cost = 7;
                    every = payload.data.every(e => e.cost >= cost);
                } else {
                    every = payload.data.every(e => e.cost == cost);
                }

                if (every) {
                    fetchedCosts.push(cost);
                }
            }

            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                items: items,
                fetchedCosts: fetchedCosts,
                fetchedPlayerClasses: fetchedPlayerClasses,
            });
        case types['fetch_list'].error:
            const { data, status } = payload.response;
            return Object.assign({}, state, { isFetching: false, error: { data, status } });
        default:
            return state;
    }
}