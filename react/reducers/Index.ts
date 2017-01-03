import { combineReducers } from 'redux';

import counts from './counts.reducer';
import image from './image.reducer';
import games from './games.reducer';
import gourmets from './gourmets.reducer';
import hearthstoneSeasons from './hearthstone-seasons.reducer';
import hearthstoneSeason from './hearthstone-season.reducer';
import hearthstoneDecks from './hearthstone-decks.reducer';
import item from './item.reducer';

export default combineReducers({
    counts, image, games, gourmets, hearthstoneSeasons, hearthstoneSeason, hearthstoneDecks, item
});