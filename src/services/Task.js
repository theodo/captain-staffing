// @flow

import moment from 'moment';

import Staffing from '../components/Staffing';

export const calculateTaskWidth = (task) => {
  const taskLength = moment(task.endDate).diff(moment(task.startDate), 'days');
  const length = taskLength * Staffing.DAY_WIDTH;

  return Math.ceil(length - 10);
};
