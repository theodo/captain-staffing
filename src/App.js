// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import Staffing from './components/Staffing';

type Props = {
  store: Store,
};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Staffing />
      </Provider>
    );
  }
}
