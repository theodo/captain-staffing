import React, { Component } from 'react'

import { checkAuth, load } from '../helpers/spreadsheet'
import { toggleByPeopleId } from '../helpers/edit'
import { checkTrelloAuth } from '../helpers/trello'

import Alert from './Alert'
import StaffingTable from './StaffingTable'
import CaptainTrello from './CaptainTrello'
import Projects from './Projects'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      peopleStaffing: null,
      trelloAuthenticated: null,
    }
  }

  componentDidMount() {
    checkTrelloAuth((authenticated) => {
      this.setState({
        trelloAuthenticated: authenticated,
      })
    })
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth.bind(this))
    })
  }

  /**
   * Check user authentication status and set app state accordingly
   */
  handleAuth(authResult) {
    if (authResult && !authResult.error) {
      this.setState({
        authenticated: true,
      })
      load(this.onLoad.bind(this))
    } else {
      this.setState({
        authenticated: false,
      })
    }
  }

  /**
   * Once staffing have been loaded from the spreadsheet
   */
  onLoad(weeks, peopleStaffing, error) {
    if (peopleStaffing) {
      this.setState({
        weeks,
        peopleStaffing,
      })
    } else {
      this.setState({
        error,
      })
    }
  }

  onHeaderClick(peopleId) {
    this.setState({
      peopleStaffing: toggleByPeopleId(peopleId, this.state.peopleStaffing),
    })
  }

  onTrelloSuccess() {
    this.setState({
      trelloAuthenticated: true,
    })
  }

  onTrelloFailure() {
    this.setState({
      trelloAuthenticated: false,
    })
  }

  render() {
    return (
      <div className="app">
        <h1 className="brand">Captain Staffing</h1>
        <h2>He staffs in less than a minute</h2>
        <div className="content">
          { this.renderGoogle() }
          { this.renderStaffing() }
          { this.renderTrello() }
          { this.renderProjects() }
        </div>
      </div>
    )
  }

  renderGoogle() {
    if (this.state.authenticated === false) {
      return (
        <button onClick={this.authenticate.bind(this)} className="btn">Connect with Google</button>
      )
    }
    return null
  }

  renderTrello() {
    if (!this.state.trelloAuthenticated) {
      return (
        <CaptainTrello
          onSuccess={this.onTrelloSuccess.bind(this)}
          onFailure={this.onTrelloFailure.bind(this)}
        />
      )
    }
    return null
  }

  renderProjects() {
    if (this.state.trelloAuthenticated) {
      return (
        <Projects />
      )
    }
    return null
  }

  renderStaffing() {
    if (this.state.peopleStaffing !== null) {
      return (
        <div className="page">
          <StaffingTable
            peopleStaffing={this.state.peopleStaffing}
            onHeaderClick={this.onHeaderClick.bind(this)}
            weeks={this.state.weeks}
          />
        </div>
      )
    } else if (this.state.error) {
      return (
        <Alert error={this.state.error} />
      )
    } else if (this.state.authenticated) {
      return (
        <div className="loader" />
      )
    }
    return null
  }

  /**
   * Request Google authentication
   */
  authenticate(e) {
    e.preventDefault()
    checkAuth(false, this.handleAuth.bind(this))
  }
}

export default App
