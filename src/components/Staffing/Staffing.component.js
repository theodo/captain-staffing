// @flow

import * as React from 'react';
import moment from 'moment';
import Planning from '../Planning';
import TopBar from '../TopBar';
import LeftBar from '../LeftBar';
import StyledStaffing from './Staffing.style';


type Props = {
  users: Array<?Object>,
  timeline: Array<?Object>,
  weeks: Array<?Object>,
};

export default class Staffing extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

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

  componentWillMount() {
    this.setState({ rows: this.createRows() });
  }

  handleScroll(event) {
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

  createRows() {
    const rows = [];
    this.props.users.forEach((user) => {
      const userTimeline = this.props.timeline.filter(task => task.userId === user.id);
      const weeklyTasksCount = {};
      let maxWeeklyTasksCount = 0;

      const tasks = userTimeline.map((timelineTask) => {
        const { xoffset, yoffset } = this.calculateTaskOffsets(timelineTask, weeklyTasksCount);

        return {
          timelineTask,
          xoffset,
          yoffset,
          width: this.calculateTaskWidth(timelineTask),
        };
      }, this);

      maxWeeklyTasksCount = Math.max(...Object.values(weeklyTasksCount));

      rows.push({
        user,
        tasks,
        maxWeeklyTasksCount,
        weeklyTasksCount,
      });
    });

    return rows;
  }

  calculateTaskOffsets(task, weeklyTasks) {
    const startDate = moment(task.startDate, 'YYYY-MM-DD');
    const endDate = moment(task.endDate, 'YYYY-MM-DD');

    const xoffset = this.calculateXOffset(task);
    let yoffset = Staffing.PLANNING_ROW_PADDING;
    if (weeklyTasks.hasOwnProperty(startDate.format('w'))) {
      yoffset = weeklyTasks[startDate.format('w')] * Staffing.TASK_HEIGHT + Staffing.PLANNING_ROW_PADDING;
    }

    const date = startDate.clone();
    while (date <= endDate) {
      if (!weeklyTasks.hasOwnProperty(date.format('w'))) {
        weeklyTasks[date.format('w')] = 1;
      } else {
        weeklyTasks[date.format('w')] += 1;
      }

      date.add(1, 'w');
    }

    return { xoffset, yoffset };
  }

  calculateXOffset(task) {
    return moment(task.startDate, 'YYYY-MM-DD').diff(this.props.weeks[0], 'days') * Staffing.DAY_WIDTH;
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
