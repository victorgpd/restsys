import styled from "styled-components";

export const PainelContainer = styled.div`
  transition: padding 0.3s ease-in-out;
`;

export const MenuContainer = styled.aside`
  width: 246px;
  height: 100vh;

  background-color: #2c2c2c;
  border-right: 1px solid #444;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  display: flex;
  flex-direction: column;
  padding: 24px 16px;

  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #555 #2c2c2c;

  transition: left 0.3s ease-in-out;
`;
