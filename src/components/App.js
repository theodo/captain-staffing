import React, { Component } from 'react'

import { toggleByPeopleRow } from '../helpers/edit'
import { checkTrelloAuth } from '../helpers/trello'

import Alert from './Alert'
import StaffingTable from './StaffingTable'
import CaptainGoogle from './CaptainGoogle'
import CaptainTrello from './CaptainTrello'
import Projects from './Projects'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      googleAuthenticated: null,
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
  }

  onGoogleSuccess() {
    this.setState({
      googleAuthenticated: true,
    })
  }

  onGoogleFailure() {
    this.setState({
      googleAuthenticated: false,
    })
  }

  onGoogleLoad(weeks, peopleStaffing, error) {
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

  onStaffingTableRowClick(peopleRow) {
    this.setState({
      peopleStaffing: toggleByPeopleRow(peopleRow, this.state.peopleStaffing),
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
    if (!this.state.googleAuthenticated) {
      return (
        <CaptainGoogle
          onSuccess={this.onGoogleSuccess.bind(this)}
          onFailure={this.onGoogleFailure.bind(this)}
          onLoad={this.onGoogleLoad.bind(this)}
        />
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
            onRowClick={this.onStaffingTableRowClick.bind(this)}
            weeks={this.state.weeks}
          />
        </div>
      )
    } else if (this.state.error) {
      return (
        <Alert error={this.state.error} />
      )
    } else if (this.state.googleAuthenticated) {
      return (
        <div className="loader" />
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
}

export default App
