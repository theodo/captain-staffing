// @flow

import * as React from 'react';
import moment from 'moment';

import { StyledTopBar } from './TopBar.style';
import Week from '../Week';
import { getWeekType } from '../../services/Week';

type Props = {
  weeks: Array,
};

export default class TopBar extends React.Component<Props> {
  render() {
    return (
      <StyledTopBar xoffset={this.props.xoffset}>
        {
          this.props.weeks.map(
            week => (
              <Week
                key={week.format('X')}
                week={week}
                weekType={getWeekType(moment(week))}
              />
            ),
            this,
          )
        }
      </StyledTopBar>
    );
  }
}
