// @flow

import moment from 'moment';

import {
  calculateTaskWidth,
  calculateTaskOffsets,
  calculateWeeklyTasks,
} from './Task';
import type { Person } from '../entities/Persons/api';
import type { Task } from '../entities/Tasks/api';


/**
 * Generate a list of 20 weeks, from four weeks ago to 16 weeks in future.
 *
 * @return Array<moment>
 */
export function createWeeks(): Array<moment> {
  const weeks = [];
  for (let i = -4; i <= 16; i += 1) {
    if (i < 0) {
      weeks.push(moment().subtract(i * -1, 'w').startOf('week'));
    } else {
      weeks.push(moment().add(i, 'w').startOf('week'));
    }
  }

  return weeks;
}

type Row = {
  person: Person[],
  tasks: {
    timelineTask: (?Task)[],
    xoffset: ?number,
    yoffset: ?number,
    width: ?number,
  },
  maxWeeklyTasksCount: number,
  weeklyTasksCount: { [number]: number },
};

export function createRows(
  persons: Person[],
  timeline: Task[],
  weeks: { [number]: number },
): (?Row)[] {
  const rows = [];
  persons.forEach((person) => {
    const userTimeline = timeline.filter(task => task.userId === person.id);
    let weeklyTasksCount = {};
    let maxWeeklyTasksCount = 0;

    const tasks = userTimeline.map((timelineTask) => {
      const { xoffset, yoffset } = calculateTaskOffsets(timelineTask, weeklyTasksCount, weeks[0]);

      weeklyTasksCount = calculateWeeklyTasks(timelineTask, weeklyTasksCount);
      return {
        timelineTask,
        xoffset,
        yoffset,
        width: calculateTaskWidth(timelineTask),
      };
    }, this);

    maxWeeklyTasksCount = Math.max(...Object.values(weeklyTasksCount));

    rows.push({
      person,
      tasks,
      maxWeeklyTasksCount,
      weeklyTasksCount,
    });
  });

  return rows;
}

