// @flow

import * as React from 'react';
import moment from 'moment';

import {
  StyledScrollableTimeline,
  StyledTimeline,
  StyledPlanningRow,
} from './Planning.style';
import Task from '../Task';
import Standards from '../Standards';
import ColoredWeek from '../ColoredWeek';
import {
  PLANNING_ROW_PADDING,
  TASK_HEIGHT,
  WEEK_WIDTH,
} from '../Staffing/constants';
import {
  CRISIS_WEEK,
  ALERT_WEEK,
  CURRENT_WEEK,
} from '../Week/constants';
import type { Person } from '../../entities/Persons/api';
import type { Task as TaskType } from '../../entities/Tasks/api';
import { getCrisisWeek, getAlertWeek } from '../../services/Week';

type Props = {
  xoffset: number,
  yoffset: number,
  width: number,
  weeks: moment[],
  rows: [{
    person: Person[],
    tasks: TaskType[],
    maxWeeklyTasksCount: number,
    weeklyTasksCount: { [number]: number },
  }],
  handleScroll: () => void,
};
export default class Planning extends React.Component<Props> {
  planning: ?HTMLDivElement;

  componentDidMount() {
    this.initializeScroll();
    this.attachScrollEvent();
  }

  getWeekOffset(week: number): number {
    return WEEK_WIDTH * (week - this.props.weeks[0].format('w'));
  }

  initializeScroll() {
    if (this.planning != null) {
      this.planning.scrollLeft = this.props.xoffset * -1;
    }
  }

  attachScrollEvent() {
    if (this.planning != null) {
      this.planning.addEventListener('scroll', this.props.handleScroll);
    }
  }

  render() {
    return (
      <StyledScrollableTimeline innerRef={(planning) => { this.planning = planning; }}>
        <StyledTimeline width={this.props.width}>
          {
            this.props.rows.map(
row =>
              (
                <StyledPlanningRow
                  key={row.person.username}
                  height={row.maxWeeklyTasksCount * TASK_HEIGHT + PLANNING_ROW_PADDING}
                >
                  {
                    row.tasks.map(task => (<Task
                      key={task.timelineTask.id}
                      task={task.timelineTask}
                      xoffset={task.xoffset}
                      yoffset={task.yoffset}
                      width={task.width}
                    />))
                    }
                  <Standards
                    tasks={row.tasks}
                    user={row.person}
                    weeks={this.props.weeks}
                    weeklyTasksCount={row.weeklyTasksCount}
                  />
                </StyledPlanningRow>)
            , this,
)
            }
          <ColoredWeek xoffset={this.props.xoffset * -1} weekType={CURRENT_WEEK} />
          <ColoredWeek xoffset={this.getWeekOffset(getCrisisWeek())} weekType={CRISIS_WEEK} />
          <ColoredWeek xoffset={this.getWeekOffset(getAlertWeek())} weekType={ALERT_WEEK} />
        </StyledTimeline>
      </StyledScrollableTimeline>
    );
  }
}
