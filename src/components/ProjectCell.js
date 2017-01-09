import React from 'react'
import { Cell } from 'fixed-data-table'

export default class ProjectCell extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    field: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
  };

  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        { data[rowIndex][field] }
      </Cell>
    )
  }
}
