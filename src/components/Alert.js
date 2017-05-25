import React from 'react'
import PropTypes from 'prop-types'

export default class Alert extends React.Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
  }

  render() {
    let message
    let icon

    switch (this.props.error.code) {
      case 403:
        icon = '⛔️'
        message = 'You don’t have permission to access this Spreadsheet.'
        break
      case 404:
        icon = '❓'
        message = 'Spreadsheet not found.'
        break
      case 503:
        icon = '⌚'
        message = 'Service unavailable.'
        break
      case 400:
        icon = '☹'
        message = this.props.error.message
        break
      default:
        icon = '💀'
        message = 'Doh, I couldn’t load the data.'
    }

    return (
      <p className="alert">
        <span className="alert__icon">{ icon }</span>
        <span className="alert__message">{ message }</span>
      </p>
    )
  }
}
