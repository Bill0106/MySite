import { combineReducers } from 'redux';

import counts from './counts.reducer';
import games from './games.reducer';

export default combineReducers({ counts, games })