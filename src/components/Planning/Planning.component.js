import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  StyledScrollableTimeline,
  StyledTimeline,
  StyledPlanningRow,
} from './Planning.style';
import Task from '../Task';
import NewTaskRow from '../NewTaskRow';
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

export default class Planning extends React.Component {
  componentDidMount() {
    this.initializeScroll();
    this.attachScrollEvent();
  }

  getWeekOffset(week) {
    return WEEK_WIDTH * (week - this.props.weeks[0].format('w'));
  }

  initializeScroll() {
    this.planning.scrollLeft = this.props.xoffset * -1;
  }

  attachScrollEvent() {
    this.planning.addEventListener('scroll', this.props.handleScroll);
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
                  height={((row.maxWeeklyTasksCount + 1) * TASK_HEIGHT) + PLANNING_ROW_PADDING}
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
                  <NewTaskRow
                    numberOfTasks={row.tasks.length}
                    numberOfWeeks={this.props.weeks.length}
                    personId={row.person.id}
                  />
                  <Standards
                    tasks={row.tasks}
                    user={row.person}
                    weeks={this.props.weeks}
                    weeklyTasksCount={row.weeklyTasksCount}
                  />
                </StyledPlanningRow>
              )
            )}
          <ColoredWeek xoffset={this.props.xoffset * -1} weekType={CURRENT_WEEK} />
          <ColoredWeek xoffset={this.getWeekOffset(this.props.crisisWeek.format('w'))} weekType={CRISIS_WEEK} />
          <ColoredWeek xoffset={this.getWeekOffset(this.props.alertWeek.format('w'))} weekType={ALERT_WEEK} />
        </StyledTimeline>
      </StyledScrollableTimeline>
    );
  }
}

Planning.propTypes = {
  xoffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  crisisWeek: PropTypes.instanceOf(moment),
  alertWeek: PropTypes.instanceOf(moment),
  weeks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.object,
    tasks: PropTypes.array,
    maxWeeklyTasksCount: PropTypes.number,
    weeklyTasksCount: PropTypes.object,
  })).isRequired,
  handleScroll: PropTypes.func.isRequired,
};
