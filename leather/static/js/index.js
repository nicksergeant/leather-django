import DashboardContainer from './containers/dashboard-container';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';
import { addAccount } from './actions/accounts';
import { createStore } from 'redux';

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

fetchAndStore('/api/accounts', addAccount);

ReactDOM.render(
  <Provider store={store}>
    <DashboardContainer />
  </Provider>,
  document.getElementById('dashboard')
);
