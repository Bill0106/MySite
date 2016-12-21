import { combineReducers } from 'redux';

import counts from './counts.reducer';
import games from './games.reducer';
import game from './game.reducer';

export default combineReducers({ counts, games, game })