// @flow

import * as React from 'react';
import moment from 'moment';
import Planning from '../Planning';
import TopBar from '../TopBar';
import LeftBar from '../LeftBar';
import StyledStaffing from './Staffing.style';

import {
  calculateTaskWidth,
  calculateTaskOffsets,
  calculateWeeklyTasks,
} from '../../services/Task';

type Props = {
  persons: Array<?Object>,
  timeline: Array<?Object>,
  weeks: Array<?Object>,
  fetchAllPersons: () => void,
};

export default class Staffing extends React.Component<Props> {
  state = {
    ticking: false,
    planningYOffset: 0,
    planningXOffset: Staffing.CURRENT_WEEK_INDEX * Staffing.WEEK_WIDTH * -1,
    planningWidth: Staffing.VISIBLE_WEEKS * Staffing.WEEK_WIDTH,
    currentWeek: moment().startOf('week'),
    crisisWeek: moment().startOf('week').add(5, 'w'),
    alertWeek: moment().startOf('week').add(10, 'w'),
    rows: [],
  }

  componentWillReceiveProps(newProps) {
    this.setState({ rows: this.createRows(newProps.persons, newProps.timeline, newProps.weeks) });
  }

  handleScroll = (event) => {
    if (!this.state.ticking) {
      window.requestAnimationFrame(() => {
        this.setState({
          planningYOffset: event.target.scrollTop * -1,
          planningXOffset: event.target.scrollLeft * -1,
        });
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  createRows(persons, timeline, weeks) {
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

  render() {
    return (
      <StyledStaffing>
        <TopBar
          xoffset={this.state.planningXOffset}
          currentWeek={this.state.currentWeek}
          crisisWeek={this.state.crisisWeek}
          alertWeek={this.state.alertWeek}
          weeks={this.props.weeks}
        />
        <LeftBar
          yoffset={this.state.planningYOffset}
          rows={this.state.rows}
        />
        <Planning
          xoffset={this.state.planningXOffset}
          yoffset={this.state.planningYOffset}
          width={this.state.planningWidth}
          rows={this.state.rows}
          weeks={this.props.weeks}
          currentWeek={this.state.currentWeek}
          crisisWeek={this.state.crisisWeek}
          alertWeek={this.state.alertWeek}
          handleScroll={this.handleScroll}
        />
      </StyledStaffing>
    );
  }
}

Staffing.WEEK_WIDTH = 244; // todo: calculate it from the DOM node?
Staffing.DAY_WIDTH = Staffing.WEEK_WIDTH / 7;
Staffing.TASK_HEIGHT = 35;
Staffing.PLANNING_ROW_PADDING = 5;
Staffing.VISIBLE_WEEKS = 20;
Staffing.CURRENT_WEEK_INDEX = 4;
Staffing.NEXT_5_WEEK_INDEX = Staffing.CURRENT_WEEK_INDEX + 5;
Staffing.NEXT_10_WEEK_INDEX = Staffing.NEXT_5_WEEK_INDEX + 5;
