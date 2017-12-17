// @flow

import * as React from 'react';
import { StyledStandards, StyledWeeklyStandards } from './Standards.style';

type Props = {
  user: {
    standards: {
      projects: number,
    },
  },
  weeks: Array<any>,
  weeklyTasksCount: {},
};

export default class Standards extends React.Component<Props> {
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
