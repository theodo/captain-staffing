// @flow

import * as React from 'react';
import { StyledColoredWeek } from './ColoredWeek.style';

type Props = {
  xoffset: number,
  weekType: string,
};

type State = {
  left: number,
};

export default class ColoredWeek extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      left: this.props.xoffset,
    };
  }
  render() {
    return (
      <StyledColoredWeek left={this.state.left} weekType={this.props.weekType} />
    );
  }
}
