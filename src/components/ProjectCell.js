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

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  onBlur(data, rowIndex, field) {
    this.props.onChange(data, rowIndex, data[rowIndex][field], this.state.value)
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  renderContent(data, rowIndex, field) {
    if (data[rowIndex]._editable) {
      return (<input
        type="text"
        value={this.state.value}
        onBlur={this.onBlur.bind(this, data, rowIndex, field)}
        onChange={this.onChange.bind(this)}
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
