// @flow

import moment from 'moment';

import {
  calculateTaskWidth,
  calculateTaskOffsets,
} from '../Task';
import {
  DAY_WIDTH,
  TASK_HEIGHT,
  PLANNING_ROW_PADDING,
} from '../../components/Staffing/constants';

describe('calculateTaskWidth', () => {
  it('should return the length of a one week task', () => {
    const task = {
      startDate: '2017-10-01',
      endDate: '2017-10-08',
    };

    expect(calculateTaskWidth(task)).toBe(234);
  });
});

describe('calculateTaskOffsets', () => {
  const firstWeek = moment('2017-08-07', 'YYYY-MM-DD');

  it('should return the x and y offsets of a task', () => {
    const task = {
      startDate: moment('2017-08-07', 'YYYY-MM-DD'), // week 32
      endDate: moment('2017-08-13', 'YYYY-MM-DD'), // week 32
    };

    const weeklyTasks = {};

    const expectedPosition = {
      xoffset: 0,
      yoffset: PLANNING_ROW_PADDING,
    };

    expect(calculateTaskOffsets(task, weeklyTasks, firstWeek)).toMatchObject(expectedPosition);
  });

  it('should return the x an y offsets of task starting on tuesday', () => {
    const task = {
      startDate: moment('2017-08-08', 'YYYY-MM-DD'),
      endDate: moment('2017-08-13', 'YYYY-MM-DD'),
    };

    const weeklyTasks = {};

    const expectedPosition = {
      xoffset: DAY_WIDTH,
      yoffset: PLANNING_ROW_PADDING,
    };

    expect(calculateTaskOffsets(task, weeklyTasks, firstWeek)).toMatchObject(expectedPosition);
  });

  it('should return the x and y offsets of a task overlaping another one', () => {
    const overlapingTask = {
      startDate: moment('2017-08-07', 'YYYY-MM-DD'),
      endDate: moment('2017-08-21', 'YYYY-MM-DD'),
    };

    const weeklyTasks = { 32: 1 };

    const expectedPosition = {
      xoffset: 0,
      yoffset: TASK_HEIGHT + PLANNING_ROW_PADDING,
    };

    expect(calculateTaskOffsets(
      overlapingTask, weeklyTasks, firstWeek
    )).toMatchObject(expectedPosition);
  });

  it('should return the x and y offsets of a task overlaping two other tasks', () => {
    const weeklyTasks = {
      33: 2,
      34: 2,
    };

    const overlapingTask = {
      startDate: '21/08/2017', // week 34
      endDate: '17/09/2017', // week 38
    };

    const expectedPosition = {
      yoffset: (TASK_HEIGHT * 2) + PLANNING_ROW_PADDING,
    };

    expect(calculateTaskOffsets(
      overlapingTask, weeklyTasks, firstWeek
    )).toMatchObject(expectedPosition);
  });

  it('should return correct offsets of a task than spans over 2 years', () => {
    const weeklyTasks = {
      52: 0,
      53: 1,
    };
    const task = {
      startDate: '25/12/2017',
      endDate: '07/01/2018',
    };
    const expectedPosition = {
      yoffset: TASK_HEIGHT + PLANNING_ROW_PADDING,
    };

    expect(calculateTaskOffsets(task, weeklyTasks, firstWeek)).toMatchObject(expectedPosition);
  });
});
