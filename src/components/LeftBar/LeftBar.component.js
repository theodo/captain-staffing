// @flow

import * as React from 'react';
import Staffing from '../Staffing';

type Props = {
  rows: Array,
  yoffset: Array<?number>,
};

export default class LeftBar extends React.Component<Props> {
  render() {
    const style = {
      transform: `translate3D(0px, ${this.props.yoffset}px, 0px)`,
    };

    return (
      <div className="leftbar" style={style}>
        {
          this.props.rows.map(row => (<User key={row.user.username} user={row.user} maxWeeklyTasksCount={row.maxWeeklyTasksCount} />))
        }
      </div>
    );
  }
}

type UserProps = {
  user: {
    username: string,
  },
}

class User extends React.Component<UserProps> {
  render() {
    const style = {
      height: `${this.props.maxWeeklyTasksCount * Staffing.TASK_HEIGHT + Staffing.PLANNING_ROW_PADDING}px`,
    };

    return (
      <div className="planning-row" style={style}>{this.props.user.username}</div>
    );
  }
}