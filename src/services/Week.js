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

export const colorizeWeek = (weekType: string): string => {
  switch (weekType) {
    case ALERT_WEEK: return ALERT_WEEK_COLOR;
    case CRISIS_WEEK: return CRISIS_WEEK_COLOR;
    case CURRENT_WEEK: return CURRENT_WEEK_COLOR;
    default: return 'inherit';
  }
};

export const getWeekType = (week: moment): string | null => {
  switch (true) {
    case (week.isSame(getCurrentWeek())):
      return CURRENT_WEEK;
    case (week.isSame(getCrisisWeek())):
      return CRISIS_WEEK;
    case (week.isSame(getAlertWeek())):
      return ALERT_WEEK;
    default:
      return null;
  }
};

export const getCurrentWeek = (): moment => moment().startOf('week');
export const getCrisisWeek = (): moment => moment().startOf('week').add(5, 'w');
export const getAlertWeek = (): moment => moment().startOf('week').add(10, 'w');

