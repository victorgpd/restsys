import styled from "styled-components";

export const HeaderContainer = styled.header<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "calc(100% - 246px)" : "100%")};
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
  left: ${({ isOpen }) => (isOpen ? "246px" : "0px")};

  z-index: 1;

  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;

export const HeaderLogoContainer = styled.div`
  height: 100%;

  gap: 6px;
  display: flex;
  align-items: center;
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

export const UserNameContainer = styled.span`
  color: #fff;
  font-weight: 500;
  margin-right: 8px;
`;
