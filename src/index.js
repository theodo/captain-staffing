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

const timeline = [
  {
    id: 1,
    userId: 1,
    project: null,
    client: null,
    leave: true,
    startDate: '2017-10-31',
    endDate: '2018-12-15',
  },
  {
    id: 2,
    userId: 1,
    project: "Ask'IT",
    client: 'BNP ITG - Boost IT',
    leave: false,
    startDate: '2017-12-16',
    endDate: '2018-09-01',
  },
  {
    id: 9,
    userId: 2,
    project: 'Echoline',
    client: 'Echoline',
    leave: false,
    startDate: '2017-12-15',
    endDate: '2018-08-11',
  },
  {
    id: 3,
    userId: 2,
    project: 'Allomatch',
    client: 'Allomatch',
    leave: false,
    startDate: '2017-09-18',
    endDate: '2018-10-23',
  },
  {
    id: 4,
    userId: 2,
    project: 'WEFA',
    client: 'Safran',
    leave: false,
    startDate: '2017-12-25',
    endDate: '2018-10-16',
  },
  {
    id: 5,
    userId: 2,
    project: 'B2B',
    client: 'Fundshop',
    leave: false,
    startDate: '2017-11-09',
    endDate: '2018-10-30',
  },
  {
    id: 6,
    userId: 3,
    project: 'Projet Confidentiel',
    client: 'SG - ITIM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 7,
    userId: 3,
    project: 'Projet Confidentiel #2',
    client: 'SG - ITIM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 8,
    userId: 4,
    project: 'Fast IT - Filgood',
    client: 'Fast IT',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 10,
    userId: 5,
    project: 'Robo Mroning Star',
    client: 'BNP AM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
  {
    id: 11,
    userId: 5,
    project: 'Gouvernance',
    client: 'BNP AM',
    leave: false,
    startDate: '2017-08-07',
    endDate: '2018-10-30',
  },
];

const weeks = [];
for (let i = -4; i <= 16; i++) {
  if (i < 0) {
    weeks.push(moment().subtract(i * -1, 'w').startOf('week'));
  } else {
    weeks.push(moment().add(i, 'w').startOf('week'));
  }
}

const initialState = {
  theodoers,
  timeline,
  weeks,
};
const store = createStore(combineReducers({}), initialState);

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
