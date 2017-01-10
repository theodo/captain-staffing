import React from 'react'

export default class SomeoneStaffing extends React.Component {

  static propTypes = {
    header: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="row">
        <div className="header cell">{ this.props.header }</div>
      </div>
    )
  }

}
