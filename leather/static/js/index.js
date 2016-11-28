import AccountDetailContainer from './containers/account-detail-container';
import React from 'react';
import ReactDOM from 'react-dom';
import AllTransactionsContainer from './containers/all-transactions-container';
import TransactionsContainer from './containers/transactions-container';
import request from 'superagent';
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';
import { addScheduledTransaction } from './actions/scheduled-transactions';
import { addTransaction } from './actions/transactions';
import { createStore } from 'redux';
import { updateAccount } from './actions/account';

import '../css/styles.scss';

const accountDetail = document.getElementById('account-detail');
const allTransactions = document.getElementById('all-transactions');
const store = createStore(rootReducer);

window.state = store.getState; // DEBUG

const fetchAndStore = (url, action) => {
  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      const response = JSON.parse(res.text);
      if (response.results) {
        response.results.map((result) => {
          store.dispatch(action(result));
        });
      } else {
        store.dispatch(action(response));
      }
    });
};

if (accountDetail) {
  fetchAndStore('/api/accounts/' + window.accountId + '/', updateAccount);
  fetchAndStore('/api/scheduled_transactions/?account=' + window.accountId, addScheduledTransaction);
  fetchAndStore('/api/transactions/?limit=30&account=' + window.accountId, addTransaction);

  ReactDOM.render(
    <Provider store={store}>
      <AccountDetailContainer />
    </Provider>,
    accountDetail
  );
}

if (allTransactions) {
  fetchAndStore('/api/transactions/?limit=30', addTransaction);
  ReactDOM.render(
    <Provider store={store}>
      <AllTransactionsContainer />
    </Provider>,
    allTransactions
  );
}
