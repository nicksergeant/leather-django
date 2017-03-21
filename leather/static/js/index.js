import AppContainer from './components/app/app-container';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import rootReducer from './reducers/root';
import styles from './styles.css';
import { Provider } from 'react-redux';
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

  fetchAndStore('/api/users', updateUser);
  fetchAndStore('/api/accounts', addAccount);

  const BasicExample = () => (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <hr/>
        <Route component={AppContainer} exact path="/" />
      </div>
    </Router>
  );

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('app')
  );
}
