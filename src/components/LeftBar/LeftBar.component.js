// @flow

import * as React from 'react';
import StyledLeftBar from './LeftBar.style';
import User from './components/User';


type Props = {
  rows: Array,
  yoffset: Array<?number>,
};

export default class LeftBar extends React.Component<Props> {
  render() {
    return (
      <StyledLeftBar yoffset={this.props.yoffset}>
        {
          this.props.rows.map(row => (
            <User
              key={row.person.username}
              user={row.person}
              maxWeeklyTasksCount={row.maxWeeklyTasksCount + 1}
            />
          ))
        }
      </StyledLeftBar>
    );
  }
}
