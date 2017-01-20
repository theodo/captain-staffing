import React from 'react'

export default class CaptainTrello extends React.Component {

  static propTypes = {
    onSuccess: React.PropTypes.func.isRequired,
    onFailure: React.PropTypes.func.isRequired,
  }

  onClick(e) {
    e.preventDefault()
    window.Trello.authorize({
      type: 'popup',
      name: 'Captain Staffing',
      scope: {
        read: 'true',
      },
      expiration: 'never',
      success: this.props.onSuccess,
      error: this.props.onFailure,
    })
  }

  render() {
    return (
      <button
        onClick={this.onClick.bind(this)}
        className="btn"
      >
        Connect with Trello
      </button>
    )
  }
}
