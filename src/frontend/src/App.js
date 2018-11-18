import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

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

export default App;
