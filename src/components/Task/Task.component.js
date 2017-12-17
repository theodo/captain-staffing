import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { StyledTask, StyledLeave } from './Task.style';

export default class Task extends React.Component {
  static getTaskLabel(task) {
    let label = `(${moment(task.endDate).diff(moment(task.startDate), 'weeks')} weeks)`;

    if (!Object.prototype.hasOwnProperty.call(task, 'leave') || !task.leave) {
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

Task.propTypes = {
  task: PropTypes.shape({
    leave: PropTypes.boolean,
    project: PropTypes.string,
    client: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  xoffset: PropTypes.number.isRequired,
  yoffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
