import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';

import store from './app/store';
import App from './App';

moment.locale('fr', {
  week: {
    dow: 1,
  },
});

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
