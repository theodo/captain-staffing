import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Standards extends Component {
  render() {
    const { weeklyTasksCount, user, weeks } = this.props;
    const { projects } = user.standards;

    const standards = weeks.map((week) => {
      const classNames = ['planning-cell', 'weekly-standard'];

      if (Object.prototype.hasOwnProperty.call(weeklyTasksCount, week.format('w')) && weeklyTasksCount[week.format('w')] > projects) {
        classNames.push('error');
      }

      return (
        <div key={week.format('w')} className={classNames.join(' ')} />
      );
    });

    return (
      <div className="standards">{standards}</div>
    );
  }
}

Standards.propTypes = {
  user: PropTypes.shape({
    standards: PropTypes.shape({
      projects: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  tasks: PropTypes.array.isRequired,
  weeks: PropTypes.array.isRequired,
  weeklyTasksCount: PropTypes.object.isRequired,
};
