// @flow

import * as React from 'react';

import StyledLeftBar from './LeftBar.style';
import LeftBarUser from '../LeftBarUser';
import type { Person } from '../../entities/Persons/api';
import type { Task } from '../../entities/Tasks/api';

type Props = {
  rows: [
    {
      person: Person,
      tasks: Array<Task>,
      maxWeeklyTasksCount: number,
      weeklyTasksCount: {
        [number]: number,
      },
    },
  ],
  yoffset: Array<?number>,
};

export default class LeftBar extends React.Component<Props> {
  render() {
    return (
      <StyledLeftBar yoffset={this.props.yoffset}>
        {
          this.props.rows.map(row => (
            <LeftBarUser
              key={row.person.username}
              user={row.person}
              maxWeeklyTasksCount={row.maxWeeklyTasksCount}
            />
          ))
        }
      </StyledLeftBar>
    );
  }
}
