import React from 'react'
import Alert from './Alert'
import PropTypes from 'prop-types'

export default class Notifications extends React.Component {

  static propTypes = {
    isSaving: PropTypes.bool,
    saveSuccess: PropTypes.bool,
    saveError: PropTypes.object,
  }

  render() {
    return (
      <div>
        { this.renderSaving() }
        { this.renderSuccess() }
        { this.renderError() }
      </div>
    )
  }

  renderSaving() {
    if (this.props.isSaving) {
      return <div className="saving" />
    }
    return null
  }

  renderSuccess() {
    if (this.props.saveSuccess) {
      return (
        <div className="checkmark-circle">
          <div className="background" />
          <div className="checkmark draw" />
        </div>
      )
    }
    return null
  }
  renderError() {
    if (this.props.saveError) {
      return (
        <div className="error-notification">
          <Alert error={this.props.saveError} />
        </div>
      )
    }
    return null
  }
}
