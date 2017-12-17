import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledStandards, StyledWeeklyStandards } from './Standards.style';


export default class Standards extends Component {
  render() {
    const { weeklyTasksCount, user, weeks } = this.props;
    const { projects } = user.standards;

    const standards = weeks.map((week) => {
      let isError = false;

      if (Object.prototype.hasOwnProperty.call(weeklyTasksCount, week.format('w')) && weeklyTasksCount[week.format('w')] > projects) {
        isError = true;
      }

      return (
        <StyledWeeklyStandards key={week.format('w')} isError={isError} />
      );
    });

    return (
      <StyledStandards>{standards}</StyledStandards>
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
