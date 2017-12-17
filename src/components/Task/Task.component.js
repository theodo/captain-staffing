// @flow

import * as React from 'react';
import moment from 'moment';

import { StyledTask, StyledLeave } from './Task.style';
import type { Task as TaskType } from '../../entities/Tasks/api';

type Props = {
  task: TaskType,
  xoffset: number,
  yoffset: number,
  width: number,
};

export default class Task extends React.Component<Props> {
  static getTaskLabel(task: TaskType) {
    let label = `(${task.endDate.diff(task.startDate, 'weeks')} weeks)`;

    if (!task.leave) {
      label = `${task.project} ${task.client} ${label}`;
    } else {
      label = `Leave ${label}`;
    }

    return label;
  }

  render() {
    if (Object.prototype.hasOwnProperty.call(this.props.task, 'leave') && this.props.task.leave) {
      return (
        <StyledLeave
          width={this.props.width}
          left={this.props.xoffset}
          top={this.props.yoffset}
        >
          {Task.getTaskLabel(this.props.task)}
        </StyledLeave>);
    }

    return (
      <StyledTask
        width={this.props.width}
        left={this.props.xoffset}
        top={this.props.yoffset}
      >
        {Task.getTaskLabel(this.props.task)}
      </StyledTask>
    );
  }
}
