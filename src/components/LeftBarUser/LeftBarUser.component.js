// @flow

import * as React from 'react';
import { TASK_HEIGHT, PLANNING_ROW_PADDING } from '../Staffing/constants';
import { StyledLeftBarUser } from './LeftBarUser.style';
import type { Person } from '../../entities/Persons/api';

type Props = {
  user: Person,
  maxWeeklyTasksCount: number,
};

export default class LeftBarUser extends React.Component<Props> {
  render() {
    const height = this.props.maxWeeklyTasksCount * TASK_HEIGHT + PLANNING_ROW_PADDING;

    return (
      <StyledLeftBarUser height={height}>{this.props.user.username}</StyledLeftBarUser>
    );
  }
}

