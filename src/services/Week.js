// @flow

import moment from 'moment';

import {
  ALERT_WEEK,
  CRISIS_WEEK,
  CURRENT_WEEK,
  ALERT_WEEK_COLOR,
  CRISIS_WEEK_COLOR,
  CURRENT_WEEK_COLOR,
} from '../components/Week/constants';

export const colorizeWeek = (weekType) => {
  switch (weekType) {
    case ALERT_WEEK: return ALERT_WEEK_COLOR;
    case CRISIS_WEEK: return CRISIS_WEEK_COLOR;
    case CURRENT_WEEK: return CURRENT_WEEK_COLOR;
    default: return 'inherit';
  }
};

export const getWeekType = (week: moment) => {
  const currentWeek = moment().startOf('week');
  const crisisWeek = moment().startOf('week').add(5, 'w');
  const alertWeek = moment().startOf('week').add(10, 'w');

  switch (true) {
    case (week.isSame(currentWeek)):
      return CURRENT_WEEK;
    case (week.isSame(crisisWeek)):
      return CRISIS_WEEK;
    case (week.isSame(alertWeek)):
      return ALERT_WEEK;
    default:
      return null;
  }
};
