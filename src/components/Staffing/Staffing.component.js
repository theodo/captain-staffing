// @flow

import * as React from 'react';
import Planning from '../Planning';
import TopBar from '../TopBar';
import LeftBar from '../LeftBar';
import StyledStaffing from './Staffing.style';

import { createRows } from '../../services/Staffing';
import { CURRENT_WEEK_INDEX, WEEK_WIDTH, VISIBLE_WEEKS } from './constants';
import type { Person } from '../../entities/Persons/api';
import type { Task } from '../../entities/Tasks/api';

type Props = {
  persons: Person[],
  timeline: Task[],
  weeks: { [number]: number },
};

type State = {
  ticking: boolean,
  planningYOffset: number,
  planningXOffset: number,
  planningWidth: number,
  rows: [],
};

export default class Staffing extends React.Component<Props, State> {
  ticking: boolean = true;

  state = {
    ticking: false,
    planningYOffset: 0,
    planningXOffset: CURRENT_WEEK_INDEX * WEEK_WIDTH * -1,
    planningWidth: VISIBLE_WEEKS * WEEK_WIDTH,
    rows: [],
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({ rows: createRows(newProps.persons, newProps.timeline, newProps.weeks) });
  }

  handleScroll = (event: SyntheticEvent<*>) => {
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

  render() {
    return (
      <StyledStaffing>
        <TopBar
          xoffset={this.state.planningXOffset}
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
          handleScroll={this.handleScroll}
        />
      </StyledStaffing>
    );
  }
}
