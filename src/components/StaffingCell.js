import React from 'react'
import { Cell } from 'fixed-data-table'

const getColor = (row, week) => {
  if (row.project) {
    return null
  }
  const staffedDaysString = row.staffing[week]._total
  if (!staffedDaysString) {
    return null
  }
  const staffedDays = parseFloat(staffedDaysString)
  if (staffedDays === 5) {
    return '#81C784' // Green
  }
  if (staffedDays > 5) {
    return '#FF9800' // Orange
  }
  if (staffedDays > 3) {
    return '#EF9A9A' // Light red
  }
  if (staffedDays > 1) {
    return '#EF5350' // Red
  }
  return '#E53935'   // Strong red
}

const getValue = (row, week) => {
  if (row.project) {
    return row.staffing[week][row.project]
  }

  return row.staffing[week]._total
}

const getClass = (row, week) => {
  const classes = ['clickable']
  if (row.project) {
    classes.push('selectable')
  }
  if (row.project && row.staffing[week]._selected === row.project) {
    classes.push('selected')
  }
  return classes.join(' ')
}

export default class StaffingCell extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    week: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    const { rowIndex, week, data, ...props } = this.props
    const style = {
      backgroundColor: getColor(data[rowIndex], week),
    }
    return (
      <Cell
        {...props}
        onClick={this.props.onClick.bind(this, data[rowIndex], week, rowIndex)}
        style={style}
        className={getClass(data[rowIndex], week)}
      >
        { getValue(data[rowIndex], week) }
      </Cell>
    )
  }
}
