import React from 'react';
import { Cell } from 'fixed-data-table';

export default class StaffingCell extends React.Component {
  render() {
    const {rowIndex, index, data, ...props} = this.props;
    return (
      <Cell {...props}>{ data[rowIndex].values[index] }</Cell>
    );
  }
}
