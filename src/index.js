import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';


import { ErrorBoundary } from 'components/stubs';
import { isDev } from 'consts';

import App from './App';
import configureStore from './configureStore';

import 'assets/main.scss';

const store = configureStore();
const mountNode = document.getElementById('app');
Modal.setAppElement(mountNode);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  mountNode,
);

if (isDev && module.hot) {
  module.hot.accept();
}
