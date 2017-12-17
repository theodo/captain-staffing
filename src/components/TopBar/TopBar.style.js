import styled from 'styled-components';

export const StyledTopBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 34px;
  padding-left: 100px;
  display: flex;
  flex-wrap: nowrap;
  background-color: #fff;
  transform: translate3D(${props => props.xoffset}px, 0px, 0px);
`;
