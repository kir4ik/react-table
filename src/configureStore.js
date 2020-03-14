import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';

import { isDev } from 'consts';

import rootReducer from './reducers/index';

export default (preloadedState) => {
  const middlewares = [thunk];

  if (isDev) {
    middlewares.push(logger);
  }

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

  if (isDev && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};
