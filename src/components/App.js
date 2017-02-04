import React, { Component } from 'react'

import { isEqual } from 'lodash'
import { toggleByPeopleRow } from '../helpers/edit'
import { checkTrelloAuth } from '../helpers/trello'
import { loadLocalStorageItem, saveLocaleStorageItem } from '../helpers/localStorage'

import Alert from './Alert'
import Header from './Header'
import StaffingTable from './StaffingTable'
import CaptainGoogle from './CaptainGoogle'
import CaptainTrello from './CaptainTrello'
import Projects from './Projects'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      googleAuthenticated: null,
      weeks: loadLocalStorageItem('weeks'),
      peopleStaffing: loadLocalStorageItem('peopleStaffing'),
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
    if (weeks && peopleStaffing && !isEqual(
      [loadLocalStorageItem('weeks'), loadLocalStorageItem('peopleStaffing')],
      [weeks, peopleStaffing]
    )) {
      this.setState({ weeks, peopleStaffing })
      saveLocaleStorageItem('weeks', weeks)
      saveLocaleStorageItem('peopleStaffing', peopleStaffing)
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
        <Header />
        <div className="content">
          { this.renderStaffing() }
          { this.renderGoogle() }
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
    if (this.state.peopleStaffing) {
      return (
        <StaffingTable
          peopleStaffing={this.state.peopleStaffing}
          onRowClick={this.onStaffingTableRowClick.bind(this)}
          weeks={this.state.weeks}
        />
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
