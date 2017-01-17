import { combineReducers } from 'redux';

import counts from './counts.reducer';
import image from './image.reducer';
import games from './games.reducer';
import gourmets from './gourmets.reducer';
import hearthstoneSeasons from './hearthstone-seasons.reducer';
import hearthstoneDecks from './hearthstone-decks.reducer';
import hearthstoneCards from './hearthstone-cards.reducer';
import hearthstoneMatches from './hearthstone-matches.reducer';
import item from './item.reducer';

const reducers = combineReducers({
    counts,
    image,
    games,
    gourmets,
    hearthstoneSeasons,
    hearthstoneDecks,
    hearthstoneCards,
    hearthstoneMatches,
    item,
});

export default reducers;