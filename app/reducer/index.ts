import {combineReducers} from 'redux';

import global from './global';
import user from './user';

export default combineReducers({
  user,
  global,
});
