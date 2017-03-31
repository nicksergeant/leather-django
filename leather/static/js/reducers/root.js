import accounts from './accounts';
import globals from './globals';
import user from './user';
import transactions from './transactions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  accounts,
  globals,
  transactions,
  user
});

export default rootReducer;
