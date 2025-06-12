import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  RegisterContainer,
  RegisterContainerLogin,
  RegisterForm,
  RegisterFormButton,
  RegisterFormError,
  RegisterFormInput,
  RegisterFormItem,
  RegisterFormTitle,
  RegisterLogotipo,
  RegisterPageContainer,
  RegisterTextError,
  RegisterTextLogin,
  RegisterTextLoginLink,
  RegisterTitle,
} from "./styles";
import { RoutesEnums, RoutesPrivateEnums } from "../../types/enums";
import type { IUser } from "../../types/types";
import { useAuthentication } from "../../hooks/useAuthentication";

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

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { verifyLogged, register, loading, error } = useAuthentication();

  const isAtLeast16YearsOld = (birthDateString: string): boolean => {
    if (!birthDateString) return false;

    // Deve estar no formato ISO: yyyy-mm-dd
    const isISOFormat = /^\d{4}-\d{2}-\d{2}$/.test(birthDateString);
    if (!isISOFormat) return false;

    const parsedDate = new Date(birthDateString);
    const isValidDate = !isNaN(parsedDate.getTime());
    if (!isValidDate) return false;

    // Verifica se o ano é realista (ex: maior que 1900)
    const birthYear = parsedDate.getFullYear();
    if (birthYear < 1900) return false;

    const today = new Date();
    const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

    return parsedDate <= sixteenYearsAgo;
  };

  useEffect(() => {
    const errors: Record<string, string> = {};

    if (!user.name.trim() || user.name.trim().length <= 2) {
      errors.name = "O nome deve ter pelo menos 3 letras.";
    }

    if (user.cpf.replace(/\D/g, "").length !== 11) {
      errors.cpf = "O CPF deve conter 11 números.";
    }

    if (user.phone.replace(/\D/g, "").length < 11) {
      errors.phone = "Número de telefone inválido.";
    }

    if (!EMAIL_REGEX.test(user.email)) {
      errors.email = "E-mail inválido.";
    }

    if (user.password.length < 6) {
      errors.password = "A senha deve conter pelo menos 6 caracteres.";
    }

    if (!isAtLeast16YearsOld(user.birthDate)) {
      errors.birthDate = "Você precisa ter pelo menos 16 anos.";
    }

    setFieldErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [user]);

  useEffect(() => {
    verifyLogged().then(() => navigate(RoutesEnums.Home));
  }, []);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (isFormValid) {
      await register(user).then(() => navigate(RoutesPrivateEnums.Dashboard));
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterContainer>
        <RegisterLogotipo src="/images/logotipo.png" alt="Logo" />

        <RegisterTitle>Cadastro</RegisterTitle>

        <RegisterForm onSubmit={handleSubmit}>
          <RegisterFormItem>
            <RegisterFormTitle htmlFor="name">Nome</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="Nome" id="name" name="name" value={user.name} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.name && <RegisterFormError>{fieldErrors.name}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="cpf">CPF</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="CPF (somente números)" id="cpf" name="cpf" value={user.cpf} onChange={handleChangeInputs} maxLength={14} />
            {wasSubmitted && fieldErrors.cpf && <RegisterFormError>{fieldErrors.cpf}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="birthDate">Data de nascimento</RegisterFormTitle>
            <RegisterFormInput type="date" placeholder="Data de nascimento" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleChangeInputs} max={"2007-12-31"} />
            {wasSubmitted && fieldErrors.birthDate && <RegisterFormError>{fieldErrors.birthDate}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="phone">Telefone</RegisterFormTitle>
            <RegisterFormInput type="text" placeholder="Telefone" id="phone" name="phone" value={user.phone} onChange={handleChangeInputs} maxLength={15} />
            {wasSubmitted && fieldErrors.phone && <RegisterFormError>{fieldErrors.phone}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="email">E-mail</RegisterFormTitle>
            <RegisterFormInput type="email" placeholder="E-mail" id="email" name="email" value={user.email} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.email && <RegisterFormError>{fieldErrors.email}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormItem>
            <RegisterFormTitle htmlFor="password">Senha</RegisterFormTitle>
            <RegisterFormInput.Password type="password" placeholder="Senha" id="password" name="password" value={user.password} onChange={handleChangeInputs} />
            {wasSubmitted && fieldErrors.password && <RegisterFormError>{fieldErrors.password}</RegisterFormError>}
          </RegisterFormItem>

          <RegisterFormButton variant="solid" color="default" htmlType="submit" disabled={loading} loading={loading}>
            Cadastrar
          </RegisterFormButton>
        </RegisterForm>

        {error && <RegisterTextError>{error}</RegisterTextError>}

        <RegisterContainerLogin>
          <RegisterTextLogin>
            Já possui uma conta? <RegisterTextLoginLink onClick={() => navigate(RoutesEnums.Login)}>Entrar</RegisterTextLoginLink>
          </RegisterTextLogin>
        </RegisterContainerLogin>
      </RegisterContainer>
    </RegisterPageContainer>
  );
};

export default Register;
