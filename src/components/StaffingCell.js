import React from 'react';
import { Cell } from 'fixed-data-table';
import { getTooltipContent } from '../helpers/formatter';

const getColor = (staffedDaysString) => {
  if (!staffedDaysString) {
    return null;
  }
  const staffedDays = parseFloat(staffedDaysString);
  if (staffedDays === 5) {
    return '#81C784'; // Green
  }
  if (staffedDays > 5) {
    return '#FF9800'; // Orange
  }
  if (staffedDays > 3) {
    return '#EF9A9A'; // Light red
  }
  if (staffedDays > 1) {
    return '#EF5350'; // Red
  }
  return '#E53935';   // Strong red
};



export default class StaffingCell extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    week: React.PropTypes.string,
    rowIndex: React.PropTypes.number,
  };

  render() {
    const {rowIndex, week, data, ...props} = this.props;
    const style = {
      backgroundColor: getColor(data[rowIndex].staffing[week]._total),
    };
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
