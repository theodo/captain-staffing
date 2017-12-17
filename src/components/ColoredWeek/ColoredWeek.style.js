import styled from 'styled-components';

import { colorizeWeek } from '../../services/Week';

export const StyledColoredWeek = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: 0;
  height: 100%;
  width: 244px;
  background-color: ${props => colorizeWeek(props.weekType)};
`;

