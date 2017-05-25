import React from 'react'
import PropTypes from 'prop-types'
import { Table, Column, Cell } from 'fixed-data-table'
import HeaderCell from './HeaderCell'
import StaffingCell from './StaffingCell'
import ProjectCell from './ProjectCell'

import moment from 'moment'

import 'fixed-data-table/dist/fixed-data-table.css'

export default class StaffingTable extends React.Component {

  static propTypes = {
    weeks: PropTypes.array.isRequired,
    peopleStaffing: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    onProjectChange: PropTypes.func,
  }

  render() {
    return (
      <Table
        width={window.innerWidth - 20}
        rowsCount={this.props.peopleStaffing.length}
        rowHeight={35}
        maxHeight={1300}
        headerHeight={40}
      >
        <Column
          cell={
            <HeaderCell
              data={this.props.peopleStaffing}
              onClick={this.props.onRowClick}
              field="name"
            />
          }
          width={120}
          fixed
        />
        <Column
          cell={
            <ProjectCell
              data={this.props.peopleStaffing}
              onChange={this.props.onProjectChange}
              field="project"
            />
          }
          width={120}
          fixed
        />
        {
          this.props.weeks.map((week, i) => {
            return (
              <Column
                key={i}
                header={
                  <Cell>
                    { moment(week, 'DD/MM/YYYY').format('DD/MM') }
                  </Cell>
                }
                headerClassName={`staffingHeaderCell staffingHeaderCell--${i}`}
                cell={
                  <StaffingCell
                    data={this.props.peopleStaffing}
                    onClick={this.props.onRowClick}
                    week={moment(week, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  />
                }
                cellClassName={`staffingCell staffingCell--${i}`}
                width={60}
              />
            )
          })
        }
      </Table>
    )
  }
}
