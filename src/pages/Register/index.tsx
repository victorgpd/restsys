import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  RegisterContainer,
  RegisterContainerRegister,
  RegisterForm,
  RegisterFormButton,
  RegisterFormInput,
  RegisterFormItem,
  RegisterFormTitle,
  RegisterLogotipo,
  RegisterPageContainer,
  RegisterTextError,
  RegisterTextRegister,
  RegisterTextRegisterLink,
  RegisterTitle,
} from "./styles";
import { RoutesEnums } from "../../types/enums";
import type { IUser } from "../../types/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    name: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(user.email);
    const isPasswordValid = user.password.length >= 6;
    const isNameValid = user.name.trim().length > 2;
    const isCPFValid = user.cpf.replace(/\D/g, "").length === 11;
    const isPhoneValid = user.phone.replace(/\D/g, "").length >= 11;
    const isBirthDateValid = Boolean(user.birthDate);

    const formValid = isEmailValid && isPasswordValid && isNameValid && isCPFValid && isPhoneValid && isBirthDateValid;

    setIsFormValid(formValid);
  }, [user]);

  const formatCPF = (cpf: string): string => {
    const numbersOnly = cpf.replace(/\D/g, "").slice(0, 11);

    return numbersOnly
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: string): string => {
    const numbersOnly = phone.replace(/\D/g, "").slice(0, 11);

    if (numbersOnly.length <= 11) {
      // Fixo: (11) 1234-5678
      //   return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
      // } else {
      // Celular: (11) 91234-5678
    } else {
      return numbersOnly.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "cpf" ? formatCPF(value) : name === "phone" ? formatPhone(value) : value,
    }));
  };

  return (
    <RegisterPageContainer>
      <RegisterContainer>
        <RegisterLogotipo src="/images/logotipo.png" alt="Logo" />

        <RegisterTitle>Cadastro</RegisterTitle>

        <RegisterForm>
          <RegisterFormItem>
            <RegisterFormTitle htmlFor="name">Nome</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="Nome" id="name" name="name" value={user.name} onChange={handleChangeInputs} />
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="cpf">CPF</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="CPF (somente números)" id="cpf" name="cpf" value={user.cpf} onChange={handleChangeInputs} maxLength={14} />
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="birthDate">Data de nascimento</RegisterFormTitle>
            <RegisterFormInput type="date" placeholder="Data de nascimento" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleChangeInputs} max={"2007-12-31"} />
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="phone">Telefone</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="Telefone" id="phone" name="phone" value={user.phone} onChange={handleChangeInputs} maxLength={15} />
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="email">E-mail</RegisterFormTitle>
            <RegisterFormInput type="email" placeholder="E-mail" id="email" name="email" value={user.email} onChange={handleChangeInputs} />
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="password">Senha</RegisterFormTitle>
            <RegisterFormInput.Password type="password" placeholder="Senha" id="password" name="password" value={user.password} onChange={handleChangeInputs} />
          </RegisterFormItem>

          <RegisterFormButton variant="solid" color="default" htmlType="submit" disabled={!isFormValid}>
            Cadastrar
          </RegisterFormButton>
        </RegisterForm>

        {error && <RegisterTextError>{error}</RegisterTextError>}

        <RegisterContainerRegister>
          <RegisterTextRegister>
            Já possui uma conta? <RegisterTextRegisterLink onClick={() => navigate(RoutesEnums.Login)}>Entrar</RegisterTextRegisterLink>
          </RegisterTextRegister>
        </RegisterContainerRegister>
      </RegisterContainer>
    </RegisterPageContainer>
  );
};

export default Register;
