// @flow

import * as React from 'react';
import StyledLeftBar from './LeftBar.style';

import {
  PLANNING_ROW_PADDING,
  TASK_HEIGHT,
} from '../Staffing/constants';

type Props = {
  rows: Array,
  yoffset: Array<?number>,
};

export default class LeftBar extends React.Component<Props> {
  render() {
    return (
      <StyledLeftBar yoffset={this.props.yoffset}>
        {
          this.props.rows.map(row => (
            <User
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

type UserProps = {
  user: {
    username: string,
  },
};

class User extends React.Component<UserProps> {
  render() {
    const style = {
      height: `${this.props.maxWeeklyTasksCount * TASK_HEIGHT + PLANNING_ROW_PADDING}px`,
    };

    return (
      <div className="planning-row" style={style}>{this.props.user.username}</div>
    );
  }
}
