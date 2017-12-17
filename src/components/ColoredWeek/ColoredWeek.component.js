// @flow
import * as React from 'react';
import { StyledColoredWeek } from './ColoredWeek.style';

type Props = {
  xoffset: number,
};

export default class ColoredWeek extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.xoffset,
    };
  }
  render() {
    return (
      <StyledColoredWeek left={this.state.left} />
    );
  }
}
