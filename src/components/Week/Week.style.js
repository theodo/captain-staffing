// @flow

import styled from 'styled-components';

import { colorizeWeek } from '../../services/Week';

export const StyledWeek = styled.div`
  border-right: 1px solid #eee;
  background-color: ${props => colorizeWeek(props.weekType)};
  flex: 0 0 auto;
  width: 244px;
`;

export const StyledWeekNumber = styled.div`
  font-size: 13px;
  text-align: center;
`;

export const StyledDayList = styled.div`
  display: flex;
  font-size: 10px;
`;

export const StyledDay = styled.div`
  flex: 1 0 auto;
  text-align: center;
`;
