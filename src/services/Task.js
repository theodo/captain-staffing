// @flow

import moment from 'moment';

import {
  DAY_WIDTH,
  TASK_HEIGHT,
  PLANNING_ROW_PADDING,
} from '../components/Staffing/constants';
import type { Task } from '../entities/Tasks/api';

export const calculateTaskWidth = (task: Task): number => {
  const taskLength = task.endDate.diff(moment(task.startDate), 'days');
  const length = taskLength * DAY_WIDTH;

  return Math.ceil(length - 10);
};

export const calculateXOffset = (task: Task, weekNumber: number): number => {
  const difference = task.startDate.diff(weekNumber, 'days');

  return difference * DAY_WIDTH;
};

export const calculateTaskOffsets = (task: Task, tasks: any, firstWeek: number): {
    xoffset: number,
    yoffset: number,
  } => {
  const startWeek = parseInt(task.startDate.format('w'), 10);
  const endWeek = parseInt(task.endDate.format('w'), 10) + (task.endDate.format('Y') === task.startDate.format('Y') ? 0 : 52);

  const xoffset = calculateXOffset(task, firstWeek);

  let maxNbOfTasks = 0;
  for (let week = startWeek; week <= endWeek; week += 1) {
    if (Object.prototype.hasOwnProperty.call(tasks, week)) {
      maxNbOfTasks = maxNbOfTasks < tasks[week] ? tasks[week] : maxNbOfTasks;
    }
  }
  const yoffset = maxNbOfTasks * TASK_HEIGHT + PLANNING_ROW_PADDING;

  return { xoffset, yoffset };
};

/**
 * Increment the number of tasks per week.
 *
 * @param Task task
 * @param {} weeklyTasks
 */
export const calculateWeeklyTasks = (task: Task, weeklyTasks: any): {} => {
  const newWeeklyTasks = Object.assign(weeklyTasks);

  let week = parseInt(task.startDate.format('w'), 10);
  const endWeek = parseInt(task.endDate.format('w'), 10) + (task.endDate.format('Y') === task.startDate.format('Y') ? 0 : 52);

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
