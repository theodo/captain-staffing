import React from 'react'
import { Cell } from 'fixed-data-table'

export default class ProjectCell extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    field: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }

  onChange(data, rowIndex, field, event) {
    this.props.onChange(data, rowIndex, data[rowIndex][field], event.target.value)
  }

  renderContent(data, rowIndex, field) {
    if (data[rowIndex]._editable) {
      return (<input
        value={data[rowIndex][field]}
        onChange={this.onChange.bind(this, data, rowIndex, field)}
      />)
    }
    return data[rowIndex][field]
  }

  render() {
    const { rowIndex, field, data, ...props } = this.props
    return (
      <Cell
        {...props}
        className={data[rowIndex]._editable ? 'editable' : null}
      >
        {this.renderContent(data, rowIndex, field)}
      </Cell>
    )
  }
}
