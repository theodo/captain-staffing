import React from 'react'
import PropTypes from 'prop-types'
import { Cell } from 'fixed-data-table'

export default class HeaderCell extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    field: PropTypes.string,
    rowIndex: PropTypes.number,
    onClick: PropTypes.func,
  }

  render() {
    const { rowIndex, field, data, ...props } = this.props
    return (
      <Cell
        {...props}
        onClick={this.props.onClick.bind(this, data[rowIndex])}
        className="clickable"
      >
        { data[rowIndex][field] }
      </Cell>
    )
  }
}
