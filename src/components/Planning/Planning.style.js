import styled from 'styled-components';

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
  background-image: url('../../assets/planning-background.png');
  background-size: 244px 20px;
  border-top: #eee;
`;
