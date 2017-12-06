// @flow

import moment from 'moment';

import { DAY_WIDTH } from '../components/Staffing/constants';

export const calculateTaskWidth = (task) => {
  const taskLength = moment(task.endDate).diff(moment(task.startDate), 'days');
  const length = taskLength * DAY_WIDTH;

  return Math.ceil(length - 10);
};
