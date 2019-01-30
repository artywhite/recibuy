import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import 'common/styles/index.scss';

import { fetchConfig } from 'common/actions';
import configureStore from 'common/redux/configureStore';
import Layout from 'common/components/Layout';

const history = createBrowserHistory();
const store = configureStore(history);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Provider>
  );
}

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

store.dispatch(fetchConfig()).then(renderApp);
