import accounts from './accounts';
import globals from './globals';
import user from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  accounts,
  globals,
  user
});

export default rootReducer;
