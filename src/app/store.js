// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [
  sagaMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(...enhancers),
);

sagaMiddleware.run(rootSaga);

export default store;
