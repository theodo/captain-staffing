import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import HeaderCell from './HeaderCell';
import StaffingCell from './StaffingCell';

import { tail } from 'lodash';

import style from 'fixed-data-table/dist/fixed-data-table.css';

export default class StaffingTable extends React.Component {
  render() {
    return (
      <Table
        width={window.innerWidth - 20}
        rowsCount={this.props.peopleStaffing.length}
        rowHeight={35}
        maxHeight={1300}
        headerHeight={40} >
        <Column
          cell={
            <HeaderCell
              data={this.props.peopleStaffing}
              field="name"
            />
          }
          width={120}
          fixed={true}
        />
        {
          tail(this.props.headers).map((header, i) => {
            return (
              <Column
                key={ i }
                header={
                  <Cell>{ header }</Cell>
                }
                cell={
                  <StaffingCell
                    data={ this.props.peopleStaffing }
                    index={ i }
                  />
                }
                width={80}
              />
            );
          })
        }
      </Table>
    );
  }
}
