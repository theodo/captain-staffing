import React from 'react';

export default class SomeoneStaffing extends React.Component {

  static propTypes = {
    header: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired,
  };

  render() {
    return (
      <p className="header">
        <span>{ this.props.header }</span>
      </p>
    );
  }

}
