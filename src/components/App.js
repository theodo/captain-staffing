import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { toggleByPeopleRow, select, edit, reset } from '../helpers/edit'
import { checkTrelloAuth } from '../helpers/trello'
import { update } from '../helpers/spreadsheet'

import Alert from './Alert'
import Header from './Header'
import StaffingTable from './StaffingTable'
import CaptainGoogle from './CaptainGoogle'
import CaptainTrello from './CaptainTrello'
import Notifications from './Notifications'
import Projects from './Projects'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      googleAuthenticated: null,
      weeks: [],
      peopleStaffing: null,
      trelloAuthenticated: null,
      isSaving: false,
      saveSuccess: false,
      saveError: null,
    }
  }

  componentDidMount() {
    checkTrelloAuth((authenticated) => {
      this.setState({
        trelloAuthenticated: authenticated,
      })
    })
  }

  componentWillMount() {
    document.addEventListener('keypress', this._handleKeyPress.bind(this), false)
    document.addEventListener('keydown', this._handleKeyPress.bind(this), false)
  }


  componentWillUnmount() {
    document.removeEventListener('keypress', this._handleKeyPress.bind(this), false)
    document.removeEventListener('keydown', this._handleKeyPress.bind(this), false)
  }

  _handleKeyPress(event) {
    event.preventDefault()
    if (event.type === 'keydown' && event.key !== 'Backspace') {
      return null
    }

    if (event.key === 'Enter') {
      this.setState({
        isSaving: true,
      })
      return update(this.state.peopleStaffing, (error) => {
        if (error) {
          this.setState({
            saveError: error,
            isSaving: false,
          })
        } else {
          this.setState({
            peopleStaffing: reset(this.state.peopleStaffing),
            saveSuccess: true,
            isSaving: false,
          })
        }
        return window.setTimeout(() => {
          return this.setState({
            saveSuccess: false,
            saveError: null,
          })
        }, 2000)
      })
    }

    return this.setState({
      peopleStaffing: edit(
        this.state.peopleStaffing,
        event.key
      ),
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

  onStaffingTableRowClick(peopleRow, week, rowIndex, event) {
    if (peopleRow.project) {
      return this.setState({
        peopleStaffing: select(
          week,
          rowIndex,
          this.state.peopleStaffing,
          event.shiftKey,
          event.ctrlKey,
        ),
      })
    }
    return this.setState({
      peopleStaffing: toggleByPeopleRow(
        peopleRow,
        this.state.peopleStaffing
      ),
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
        <Notifications
          isSaving={this.state.isSaving}
          saveSuccess={this.state.saveSuccess}
          saveError={this.state.saveError}
        />
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
