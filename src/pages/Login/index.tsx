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
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (loginType === "email") {
      if (!email) {
        newErrors.email = "O e-mail é obrigatório.";
      } else if (!EMAIL_REGEX.test(email)) {
        newErrors.email = "E-mail inválido.";
      }

      if (!password) {
        newErrors.password = "A senha é obrigatória.";
      } else if (password.length < 6) {
        newErrors.password = "A senha deve ter ao menos 6 caracteres.";
      }
    } else {
      if (!agency) {
        newErrors.agency = "A agência é obrigatória.";
      } else if (agency.length !== 4) {
        newErrors.agency = "A agência deve conter 4 dígitos.";
      }

      if (!account) {
        newErrors.account = "A conta é obrigatória.";
      } else if (account.replace(/\D/g, "").length !== 7) {
        newErrors.account = "A conta deve conter 6 dígitos + 1 verificador.";
      }

      if (!password) {
        newErrors.password = "A senha é obrigatória.";
      } else if (password.length < 6) {
        newErrors.password = "A senha deve ter ao menos 6 caracteres.";
      }
    }

    setFieldErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password, agency, account, loginType]);

  const handleLoginTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginType(event.target.value as "email" | "account");
  };

  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) return;

    setError(""); // limpar erro geral
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginLogotipo src="/images/logotipo.png" alt="Logo" />

        <LoginTitle>Entrar</LoginTitle>

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

        <LoginForm onSubmit={handleSubmit}>
          {loginType === "email" ? (
            <LoginFormItem>
              <LoginFormTitle htmlFor="email">E-mail</LoginFormTitle>
              <LoginFormInput type="email" placeholder="E-mail" id="email" name="email" value={email} onChange={handleChangeInputs} />
              {wasSubmitted && fieldErrors.email && <LoginTextError>{fieldErrors.email}</LoginTextError>}
            </LoginFormItem>
          ) : (
            <>
              <LoginFormItem>
                <LoginFormTitle htmlFor="agency">Agência</LoginFormTitle>
                <LoginFormInput placeholder="Agência" id="agency" name="agency" value={agency} onChange={handleChangeInputs} onBlur={handleAgencyBlur} maxLength={4} />
                {wasSubmitted && fieldErrors.agency && <LoginTextError>{fieldErrors.agency}</LoginTextError>}
              </LoginFormItem>

              <LoginFormItem>
                <LoginFormTitle htmlFor="account">Conta</LoginFormTitle>
                <LoginFormInput placeholder="Conta (com verificador)" id="account" name="account" value={account} onChange={handleChangeInputs} maxLength={8} />
                {wasSubmitted && fieldErrors.account && <LoginTextError>{fieldErrors.account}</LoginTextError>}
              </LoginFormItem>
            </>
          )}

          <LoginFormItem>
            <LoginFormTitle htmlFor="password">Senha</LoginFormTitle>
            <LoginFormInput.Password type="password" placeholder="Senha" id="password" name="password" value={password} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.password && <LoginTextError>{fieldErrors.password}</LoginTextError>}
          </LoginFormItem>

          <LoginFormButton variant="solid" color="default" htmlType="submit">
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
