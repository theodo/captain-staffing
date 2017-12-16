import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Task from '../Task';
import Standards from '../Standards';
import {
  PLANNING_ROW_PADDING,
  TASK_HEIGHT,
  WEEK_WIDTH,
} from '../Staffing/constants';

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
    const timelineStyles = {
      width: `${this.props.width}px`,
    };

    return (
      <div ref={(planning) => { this.planning = planning; }} className="scrollable-timeline">
        <div className="timeline" style={timelineStyles}>
          {
            this.props.rows.map(
row =>
              (
                <div
                  key={row.person.username}
                  className="planning-row"
                  style={{ height: `${row.maxWeeklyTasksCount * TASK_HEIGHT + PLANNING_ROW_PADDING}px` }}
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
                </div>)
            , this,
)
            }
          <ColoredWeek xoffset={this.props.xoffset * -1} className="current-week" />
          <ColoredWeek xoffset={this.getWeekOffset(this.props.crisisWeek.format('w'))} className="crisis-week" />
          <ColoredWeek xoffset={this.getWeekOffset(this.props.alertWeek.format('w'))} className="alert-week" />
        </div>
      </div>
    );
  }
}

Planning.propTypes = {
  xoffset: PropTypes.number.isRequired,
  yoffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  currentWeek: PropTypes.instanceOf(moment),
  crisisWeek: PropTypes.instanceOf(moment),
  alertWeek: PropTypes.instanceOf(moment),
  weeks: PropTypes.array.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.object,
    tasks: PropTypes.array,
    maxWeeklyTasksCount: PropTypes.number,
    weeklyTasksCount: PropTypes.object,
  })).isRequired,
  handleScroll: PropTypes.func.isRequired,
};

class ColoredWeek extends React.Component {
    state = {
      xoffset: 0,
    }

    componentWillMount() {
      this.setState({ xoffset: this.props.xoffset });
    }

    render() {
      const style = {
        left: this.state.xoffset,
      };

      const classNames = `planning-column planning-cell ${this.props.className}`;

      return (
        <div className={classNames} style={style} />
      );
    }
}

ColoredWeek.propTypes = {
  xoffset: PropTypes.number.isRequired,
};
