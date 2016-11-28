import account from './account';
import transactions from './transactions';
import scheduledTransactions from './scheduled-transactions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  account,
  transactions,
  scheduledTransactions
});

export default rootReducer;
