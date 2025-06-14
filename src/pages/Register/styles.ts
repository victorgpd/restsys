import { Button, Input } from "antd";
import styled from "styled-components";

export const RegisterPageContainer = styled.div`
  height: 100%;
  gap: 12px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const RegisterContainer = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 16px 12px;
  border-radius: 8px;

  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  gap: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const RegisterLogotipo = styled.img`
  width: 64px;
  height: 64px;
`;

export const RegisterTitle = styled.h1`
  color: #333;
  font-size: 1.6rem;
`;

export const RegisterForm = styled.form`
  width: 100%;
  max-width: 280px;
  margin-top: 16px;

  gap: 12px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const RegisterFormItem = styled.div`
  width: 100%;
  gap: 4px;
  display: flex;
  flex-flow: column;
`;

export const RegisterFormTitle = styled.label`
  color: #6a6c84;
  font-weight: 600;
  font-size: 0.9rem;
  margin-left: 4px;
`;

export const RegisterFormInput = styled(Input)`
  width: 100%;
  font-size: 0.9rem;
`;

export const RegisterFormButton = styled(Button)`
  width: 100%;
  height: 32px;
  font-size: 0.9rem;
`;

export const RegisterFormError = styled.span`
  color: red;
  font-size: 0.75rem;
`;

export const RegisterTextError = styled.span`
  color: red;
  font-size: 0.9rem;
`;

export const RegisterContainerLogin = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

export const RegisterTextLogin = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 0.85rem;
`;

export const RegisterTextLoginLink = styled.span`
  color: blue;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
