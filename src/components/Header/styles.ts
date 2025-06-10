import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: calc(100% - 246px);
  height: 70px;
  padding: 10px 24px;

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

export const HeaderLogoContainer = styled.div`
  height: 100%;
`;

export const HeaderLinkLogo = styled.a`
  height: 100%;
  color: white;

  gap: 8px;
  display: flex;
  align-items: center;

  cursor: pointer;
  text-decoration: none;
`;

export const HeaderLogotipo = styled.img`
  height: 100%;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
`;

export const HeaderContainerButtons = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
`;