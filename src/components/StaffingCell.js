import React from 'react';
import { Cell } from 'fixed-data-table';
import { getTooltipContent } from '../helpers/formatter';

const getColor = (staffedDaysString) => {
  if (!staffedDaysString) {
    return null;
  }
  const staffedDays = parseFloat(staffedDaysString);
  if (staffedDays === 5) {
    return '#81C784';
  }
  if (staffedDays > 5) {
    return '#FF9800';
  }
  if (staffedDays > 3) {
    return '#EF9A9A';
  }
  if (staffedDays > 1) {
    return '#EF5350';
  }
  return '#E53935';
}



export default class StaffingCell extends React.Component {
  render() {
    const {rowIndex, week, data, ...props} = this.props;
    const style = {
      backgroundColor: getColor(data[rowIndex].staffing[week]._total),
    }
    return (
      <Cell
        {...props}
        style={style}
      >
        <div title={ getTooltipContent(data[rowIndex].staffing[week]) }>
          { data[rowIndex].staffing[week]._total }
        </div>
      </Cell>
    );
  }
}
