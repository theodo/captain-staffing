import React, { Component } from 'react';
import { orderBy } from 'lodash';

import { checkAuth, load, updateCell } from '../helpers/spreadsheet';
import { hash } from '../helpers/utils';
import * as ls from '../helpers/localStorage';

import Alert from './Alert';
import SomeoneStaffing from './SomeoneStaffing';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      peopleStaffing: null
    }
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth.bind(this));
    });
  }

  /**
   * Check user authenification status and set app state accordingly
   */
  handleAuth(authResult) {
    if (authResult && !authResult.error) {
      this.setState({
        authenticated: true
      });
      load(this.onLoad.bind(this))
    } else {
      this.setState({
        authenticated: false
      })
    }
  }

  /**
   * Once staffing have been loaded from the spreadsheet
   */
  onLoad(peopleStaffing, error) {
    if (peopleStaffing) {

      this.setState({
        peopleStaffing: peopleStaffing
      });
    }
    else {
      this.setState({
        error: error
      })
    }
  }

  render() {
    return (
      <div className="app">
        <h1 className="brand">Captain Staffing</h1>
        <h2>He staffs in less than a minute</h2>
        { this.renderContent() }
      </div>
    );
  }

  renderContent() {

    if (this.state.authenticated === false) {
      return (
        <button onClick={ this.authenticate.bind(this) } className="btn">Connect with Google</button>
      );
    }
    else if (this.state.peopleStaffing !== null) {
      return (
        <div className="page">
          { this.state.peopleStaffing.map((someoneStaffing, i) => {
              return (
                <SomeoneStaffing
                  key={ i }
                  header={ someoneStaffing.name }
                  values={ someoneStaffing.values } />
              );
            })
          }
        </div>
      );
    }
    else if (this.state.error) {
      return (
        <Alert error={ this.state.error } />
      );
    }
    else {
      return (
        <div className="loader" />
      );
    }
  }

  /**
   * Request Google authentification
   */
  authenticate(e) {
    e.preventDefault();
    checkAuth(false, this.handleAuth.bind(this));
  }
}

export default App;
