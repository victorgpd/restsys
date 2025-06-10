import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LoginContainer,
  LoginContainerRegister,
  LoginForm,
  LoginFormButton,
  LoginFormInput,
  LoginFormItem,
  LoginFormTitle,
  LoginLogotipo,
  LoginPageContainer,
  LoginTextError,
  LoginTextRegister,
  LoginTextRegisterLink,
  LoginTitle,
  LoginType,
  LoginTypeContainer,
} from "./styles";
import { RoutesEnums } from "../../types/enums";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<"email" | "account">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length >= 6;
    const isAgencyValid = agency.length === 4;
    const isAccountValid = account.replace(/\D/g, "").length === 7;

    const formValid = (loginType === "email" && isEmailValid && isPasswordValid) || (loginType === "account" && isAgencyValid && isAccountValid && isPasswordValid);

    setIsFormValid(formValid);
  }, [email, password, agency, account, loginType]);

  const handleLoginTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginType(event.target.value as "email" | "account");
  };

  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "agency":
        setAgency(value.replace(/\D/g, ""));
        break;
      case "account":
        setAccount(formatAccount(value));
        break;
    }
  };

  const handleAgencyBlur = () => {
    if (agency) setAgency(agency.padStart(4, "0"));
  };

  const formatAccount = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 6) return digits;
    return `${digits.slice(0, 6)}-${digits[6]}`;
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginLogotipo src="/images/logotipo.png" alt="Logo" />

        <LoginTitle>Login</LoginTitle>

        <LoginTypeContainer>
          <LoginType>
            <input type="radio" name="type" value="email" onChange={handleLoginTypeChange} checked={loginType === "email"} />
            E-mail
          </LoginType>
          <LoginType>
            <input type="radio" name="type" value="account" onChange={handleLoginTypeChange} checked={loginType === "account"} />
            Conta
          </LoginType>
        </LoginTypeContainer>

        <LoginForm>
          {loginType === "email" ? (
            <LoginFormItem>
              <LoginFormTitle htmlFor="email">E-mail</LoginFormTitle>
              <LoginFormInput type="email" placeholder="E-mail" id="email" name="email" value={email} onChange={handleChangeInputs} />
            </LoginFormItem>
          ) : (
            <>
              <LoginFormItem>
                <LoginFormTitle htmlFor="agency">Agência</LoginFormTitle>
                <LoginFormInput placeholder="Agência" id="agency" name="agency" value={agency} onChange={handleChangeInputs} onBlur={handleAgencyBlur} maxLength={4} />
              </LoginFormItem>
              <LoginFormItem>
                <LoginFormTitle htmlFor="account">Conta</LoginFormTitle>
                <LoginFormInput placeholder="Conta (com verificador)" id="account" name="account" value={account} onChange={handleChangeInputs} maxLength={8} />
              </LoginFormItem>
            </>
          )}

          <LoginFormItem>
            <LoginFormTitle htmlFor="password">Senha</LoginFormTitle>
            <LoginFormInput.Password type="password" placeholder="Senha" id="password" name="password" value={password} onChange={handleChangeInputs} />
          </LoginFormItem>

          <LoginFormButton variant="solid" color="default" htmlType="submit" disabled={!isFormValid}>
            Entrar
          </LoginFormButton>
        </LoginForm>

        {error && <LoginTextError>{error}</LoginTextError>}

        <LoginContainerRegister>
          <LoginTextRegister>
            Novo por aqui? <LoginTextRegisterLink onClick={() => navigate(RoutesEnums.Register)}>Cadastre-se</LoginTextRegisterLink>
          </LoginTextRegister>
        </LoginContainerRegister>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;
