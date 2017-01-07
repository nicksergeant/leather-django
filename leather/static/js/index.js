import DashboardContainer from './components/dashboard/dashboard-container';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';
import { addAccount } from './actions/accounts';
import { createStore } from 'redux';
import { updateGlobals } from './actions/globals';
import { updateUser } from './actions/users';

const dashboard = document.getElementById('dashboard');

if (dashboard) {
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

  fetchAndStore('/api/users', updateUser);
  fetchAndStore('/api/accounts', addAccount);

  ReactDOM.render(
    <Provider store={store}>
      <DashboardContainer />
    </Provider>,
    document.getElementById('dashboard')
  );
}
