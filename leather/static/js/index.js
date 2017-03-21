import AppContainer from './components/app/app-container';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import rootReducer from './reducers/root';
import styles from './styles.css';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { addAccount } from './actions/accounts';
import { createStore } from 'redux';
import { updateGlobals } from './actions/globals';
import { updateUser } from './actions/users';

const app = document.getElementById('app');

if (app) {
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

  store.dispatch(updateGlobals(window.LeatherGlobals));

  fetchAndStore('/api/users/', updateUser);
  fetchAndStore('/api/accounts/', addAccount);

  const Root = () => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={AppContainer}  path="/(:filter)" />
      </Router>  
    </Provider>
  );

  ReactDOM.render(<Root />, document.getElementById('app')
  );
}
