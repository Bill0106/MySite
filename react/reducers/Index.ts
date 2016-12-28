import { combineReducers } from 'redux';

import counts from './counts.reducer';
import image from './image.reducer';
import games from './games.reducer';
import game from './game.reducer';
import gourmets from './gourmets.reducer';
import gourmet from './gourmet.reducer';

export default combineReducers({ counts, image, games, game, gourmets, gourmet })