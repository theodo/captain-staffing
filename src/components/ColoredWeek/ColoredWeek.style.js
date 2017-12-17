import styled from 'styled-components';

const colorizeWeek = (weekType) => {
  switch (weekType) {
    case 'alert': return '#ffe8cc';
    case 'crisis': return '#ffe3e3';
    default: return '#edf5fd';
  }
};

export const StyledColoredWeek = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: 0;
  height: 100%;
  width: 244px;
  background-color: ${props => colorizeWeek(props.weekType)};
`;

