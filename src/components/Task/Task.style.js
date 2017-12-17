import styled from 'styled-components';

export const StyledTask = styled.div`    
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  position: absolute;
  padding: 5px;
  height: 30px;
  background-color: #65d006;
  z-index: 2;
`;

export const StyledLeave = StyledTask.extend`
  background-color: #EEE;
`;
