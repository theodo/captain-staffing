import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import moment from 'moment';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

moment.locale('fr', {
  week: {
    dow: 1,
  },
});

const theodoers = [
  {
    id: 1,
    username: 'jonathanb',
    standards: {
      projects: 1,
    },
  },
  {
    id: 2,
    username: 'maximet',
    standards: {
      projects: 1,
    },
  },
  {
    id: 3,
    username: 'stanislasb',
    standards: {
      projects: 2,
    },
  },
  {
    id: 4,
    username: 'clementrp',
    standards: {
      projects: 2,
    },
  },
  {
    id: 5,
    username: 'matthieua',
    standards: {
      projects: 2,
    },
  },
];

const store = createStore(
  combineReducers({}),
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootEl = document.getElementById('app');

ReactDOM.render(
  <App store={store} />,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(
      <NextApp store={store} />,
      rootEl,
    );
  });
}
