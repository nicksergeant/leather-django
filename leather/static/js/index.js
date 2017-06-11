import AccountDetailContainer from './components/accounts/account-detail-container/index';
import HomeContainer from './components/home-container/index';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import rootReducer from './reducers/root';
import styles from './styles.css';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { addAccount } from './actions/accounts';
import { addTransactions } from './actions/transactions';
import { createStore } from 'redux';
import { updateGlobals } from './actions/globals';
import { updateUser } from './actions/users';

const app = document.getElementById('app');

if (app) {
  const store = createStore(rootReducer);

  window.state = store.getState; // DEBUG

  store.dispatch(updateGlobals(window.LeatherGlobals));

  request
    .get('/api/users/')
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.body.results.map(result => {
        store.dispatch(updateUser(result));
      });
    });

  request
    .get('/api/accounts/')
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.body.results.map(result => {
        const transactions = result.transactions;
        delete result.transactions;
        store.dispatch(addTransactions(transactions));
        store.dispatch(addAccount(result));
      });
    });

  const Root = () =>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={HomeContainer} path="/" />
        <Route
          component={AccountDetailContainer}
          path="/accounts/(:accountSlug)"
        />
      </Router>
    </Provider>;

  ReactDOM.render(<Root />, document.getElementById('app'));
}
