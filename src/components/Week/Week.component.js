// @flow

import * as React from 'react';
import moment from 'moment';

import { StyledWeek, StyledWeekNumber, StyledDayList, StyledDay } from './Week.style';

type Props = {
  week: moment,
  weekType: string,
};

export default class Week extends React.Component<Props> {
  render() {
    const days = [];

    for (let weekday = 0; weekday < 7; weekday += 1) {
      const day = this.props.week.clone().add(weekday, 'days');
      days.push(<StyledDay key={weekday}>{day.format('dd D')}</StyledDay>);
    }

    return (
      <StyledWeek weekType={this.props.weekType}>
        <StyledWeekNumber>
          {this.props.week.format('MMM W')}
        </StyledWeekNumber>
        <StyledDayList>
          { days }
        </StyledDayList>
      </StyledWeek>
    );
  }
}
