// @flow

import styled from 'styled-components';
import planningBackground from '../../assets/planning-background.png';

export const StyledScrollableTimeline = styled.div`
  position: relative;
  top: 34px;
  left: 100px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const StyledTimeline = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  min-height: 100px;
  background-image: url(${planningBackground});
  background-size: 244px 20px;
  border-top: #eee;
`;

export const StyledPlanningRow = styled.div`
  height: ${props => props.height}px;
  min-height: 40px;
  padding: 5px;
  display: flex;
  position: relative;
  box-shadow: inset 0 1px 0 0 #eee;
`;
