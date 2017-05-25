import React from 'react'
import PropTypes from 'prop-types'

export default class SomeoneStaffing extends React.Component {

  static propTypes = {
    header: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="row">
        <div className="header cell">{ this.props.header }</div>
      </div>
    )
  }

}
