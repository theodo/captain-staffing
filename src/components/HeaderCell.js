import React from 'react';
import { Cell } from 'fixed-data-table';

export default class HeaderCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>{ data[rowIndex][field] }</Cell>
    );
  }
}
