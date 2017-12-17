import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TopBar extends Component {
  getWeekClassName(week) {
    let className = '';

import Week from '../Week';
import { getWeekType } from '../../services/Week';

    return className;
  }

  render() {
    const style = {
      transform: `translate3D(${this.props.xoffset}px, 0px, 0px)`,
    };

    return (
      <div className="topbar" style={style}>
        {
          this.props.weeks.map(
            week => (
              <Week
                key={week.format('X')}
                week={week}
                className={this.getWeekClassName(moment(week))}
              />
            ),
            this,
          )
        }
      </div>
    );
  }
}

TopBar.propTypes = {
  xoffset: PropTypes.number.isRequired,
  currentWeek: PropTypes.instanceOf(moment),
  crisisWeek: PropTypes.instanceOf(moment),
  alertWeek: PropTypes.instanceOf(moment),
  weeks: PropTypes.array.isRequired,
};
