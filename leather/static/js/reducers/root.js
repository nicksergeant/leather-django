import accounts from './accounts';
import transactions from './transactions';
import scheduledTransactions from './scheduled-transactions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  accounts,
  transactions,
  scheduledTransactions
});

export default rootReducer;
