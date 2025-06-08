import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: calc(100% - 246px);
  height: 70px;
  padding: 16px 24px;

  color: #ffffff;
  background-color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 246px;

  z-index: 1;

  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;
