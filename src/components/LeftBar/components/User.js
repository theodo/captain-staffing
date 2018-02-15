// @flow

import * as React from 'react';

import {
  PLANNING_ROW_PADDING,
  TASK_HEIGHT,
} from '../../Staffing/constants';


type UserProps = {
  user: {
    username: string,
  },
};

export default class User extends React.Component<UserProps> {
  render() {
    const style = {
      border: '1px black solid',
      height: `${this.props.maxWeeklyTasksCount * TASK_HEIGHT + PLANNING_ROW_PADDING}px`,
    };

    return (
      <div className="planning-row" style={style}>{this.props.user.username}</div>
    );
  }
}
