// @flow

import styled from 'styled-components';

export const StyledStandards = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  height: 5px;
`;

export const StyledWeeklyStandards = styled.div`
  display: flex;
  flex: 0 0 auto;
  width: 244px;
  z-index: 3;
  background-color: ${props => (props.isError ? 'red' : 'inherit')};
`;
