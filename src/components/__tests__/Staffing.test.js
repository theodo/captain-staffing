import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Staffing from '../Staffing';

describe('Staffing test suites', () => {
  const users = [
    {
      id: 1,
      username: 'benjaming',
      standards: {
        projects: 1,
      },
    },
  ];

  const weeks = [
    moment('2017-08-07', 'YYYY-MM-DD'),
    moment('2017-08-14', 'YYYY-MM-DD'),
    moment('2017-08-21', 'YYYY-MM-DD'),
    moment('2017-08-28', 'YYYY-MM-DD'),
  ];

  const staffing = shallow(<Staffing users={users} weeks={weeks} timeline={[]} />);

  it('should render without throwing an error', () => {
    expect(staffing.is('.scrollable-wrapper')).toBe(true);
  });

  it('should return the x and y offsets of a task', () => {
    const task = {
      startDate: moment('2017-08-07', 'YYYY-MM-DD'),
      endDate: moment('2017-08-13', 'YYYY-MM-DD'),
    };

    const weeklyTasks = {};

    const expectedPosition = {
      xoffset: 0,
      yoffset: Staffing.PLANNING_ROW_PADDING,
    };

    expect(staffing.instance()._calculateTaskOffsets(task, weeklyTasks)).toMatchObject(expectedPosition);
  });

  it('should return the x an y offsets of task starting on tuesday', () => {
    const task = {
      startDate: moment('2017-08-08', 'YYYY-MM-DD'),
      endDate: moment('2017-08-13', 'YYYY-MM-DD'),
    };

    const weeklyTasks = {};

    const expectedPosition = {
      xoffset: Staffing.DAY_WIDTH,
      yoffset: Staffing.PLANNING_ROW_PADDING,
    };

    expect(staffing.instance()._calculateTaskOffsets(task, weeklyTasks)).toMatchObject(expectedPosition);
  });

  it('should return the x and y offsets of a task overlaping another one', () => {
    const overlapingTask = {
      startDate: moment('2017-08-07', 'YYYY-MM-DD'),
      endDate: moment('2017-08-21', 'YYYY-MM-DD'),
    };

    const weeklyTasks = { 32: 1 };

    const expectedPosition = {
      xoffset: 0,
      yoffset: Staffing.TASK_HEIGHT + Staffing.PLANNING_ROW_PADDING,
    };

    expect(staffing.instance()._calculateTaskOffsets(overlapingTask, weeklyTasks)).toMatchObject(expectedPosition);
  });

  it('should return the x and y offsets of a task overlaping two other tasks', () => {
    const weeklyTasks = {
      33: 2,
      34: 2,
    };

    const overlapingTask = {
      startDate: '21/08/2017',
      endDate: '17/09/2017',
    };

    const expectedPosition = {
      yoffset: Staffing.TASK_HEIGHT * 2 + Staffing.PLANNING_ROW_PADDING,
    };

    expect(staffing.instance()._calculateTaskOffsets(overlapingTask, weeklyTasks)).toMatchObject(expectedPosition);
  });
});
