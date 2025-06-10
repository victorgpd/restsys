import { Button, Input } from "antd";
import styled from "styled-components";

export const LoginPageContainer = styled.div`
  height: 100%;

  gap: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 24px 16px;
  border-radius: 8px;

  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  gap: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const LoginLogotipo = styled.img`
  width: 100px;
  height: 100px;
`;

export const LoginTitle = styled.h1`
  color: #333;
  font-size: 2.2rem;
`;

export const LoginTypeContainer = styled.div`
  width: 100%;
  padding: 8px;
  max-width: 300px;
  margin-top: 35px;
  border-radius: 8px;

  gap: 10px;
  display: flex;
  align-items: center;
`;

export const LoginType = styled.label`
  gap: 5px;
  display: flex;
`;

export const LoginTextError = styled.span`
  color: red;
  font-size: 0.9rem;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 300px;

  gap: 24px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const LoginFormItem = styled.div`
  width: 100%;

  gap: 7px;
  display: flex;
  flex-flow: column;
`;

export const LoginFormTitle = styled.label`
  color: #6a6c84;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01px;

  margin-left: 5px;
`;

export const LoginFormInput = styled(Input)`
  width: 100%;

  font-size: 1rem;
`;

export const LoginFormButton = styled(Button)`
  width: 100%;
  height: 35px;
  font-size: 1rem;
`;

export const LoginContainerRegister = styled.div`
  width: 100%;
  text-align: center;

  margin-top: 20px;
`;

export const LoginTextRegister = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const LoginTextRegisterLink = styled.span`
  color: blue;
  font-weight: 600;
  font-size: 0.9rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
