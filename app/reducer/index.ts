import {combineReducers} from 'redux';

import global from './global';
import user from './user';
import history from './history';

export default combineReducers({
  user,
  global,
  history,
});
