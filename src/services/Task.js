// @flow

import moment from 'moment';

import {
  DAY_WIDTH,
  TASK_HEIGHT,
  PLANNING_ROW_PADDING,
} from '../components/Staffing/constants';

export const calculateTaskWidth = (task) => {
  const taskLength = moment(task.endDate).diff(moment(task.startDate), 'days');
  const length = taskLength * DAY_WIDTH;

  return Math.ceil(length - 10);
};

export const calculateXOffset = (task, week) => {
  const startDate = moment(task.startDate, 'YYYY-MM-DD');
  const difference = startDate.diff(week, 'days');

  return difference * DAY_WIDTH;
};

export const calculateTaskOffsets = (task, weeklyTasks, firstWeek) => {
  const startDate = moment(task.startDate, 'YYYY-MM-DD');
  const endDate = moment(task.endDate, 'YYYY-MM-DD');

  const startWeek = parseInt(startDate.format('w'), 10);
  const endWeek = parseInt(endDate.format('w'), 10) + (endDate.format('Y') === startDate.format('Y') ? 0 : 52);

  const xoffset = calculateXOffset(task, firstWeek);

  let maxNbOfTasks = 0;
  for (let week = startWeek; week <= endWeek; week += 1) {
    if (Object.prototype.hasOwnProperty.call(weeklyTasks, week)) {
      maxNbOfTasks = maxNbOfTasks < weeklyTasks[week] ? weeklyTasks[week] : maxNbOfTasks;
    }
  }
  const yoffset = (maxNbOfTasks * TASK_HEIGHT) + PLANNING_ROW_PADDING;

  return { xoffset, yoffset };
};

export const calculateWeeklyTasks = (task, weeklyTasks) => {
  const startDate = moment(task.startDate, 'YYYY-MM-DD');
  const endDate = moment(task.endDate, 'YYYY-MM-DD');
  const newWeeklyTasks = Object.assign(weeklyTasks);

  let week = parseInt(startDate.format('w'), 10);
  const endWeek = parseInt(endDate.format('w'), 10) + (endDate.format('Y') === startDate.format('Y') ? 0 : 52);

  while (week <= endWeek) {
    if (!Object.prototype.hasOwnProperty.call(weeklyTasks, week)) {
      newWeeklyTasks[week] = 1;
    } else {
      newWeeklyTasks[week] += 1;
    }
    week += 1;
  }

  return newWeeklyTasks;
};
