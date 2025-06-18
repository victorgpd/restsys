import { Button, Tooltip } from "antd";
import { BellFilled, CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { HeaderContainer, HeaderContainerButtons, HeaderLinkLogo, HeaderLogoContainer, HeaderLogotipo, HeaderTitle, UserNameContainer } from "./styles";
import { useAppDispatch, useAppSelector } from "../../utils/useStore";
import { setMenuIsOpen } from "../../redux/globalReducer/slice";
import { RoutesEnums } from "../../types/enums";
import { useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { logout, verifyLogged } = useAuthentication();
  const { menuIsOpen, user } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    verifyLogged();
  }, [verifyLogged, user]);

  const handleToggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  const handleCapitalizeWord = (word: string) => word.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <HeaderContainer style={window.location.pathname.includes("home") ? { width: menuIsOpen ? "calc(100% - 246px)" : "100%", left: menuIsOpen ? 246 : 0 } : { width: "100%", left: 0 }}>
      <HeaderLogoContainer>
        {window.location.pathname.includes("home") && (
          <Button type="text" onClick={handleToggleMenu} icon={menuIsOpen ? <CloseOutlined style={{ color: "#fff" }} /> : <MenuOutlined style={{ color: "#fff" }} />} style={{ fontSize: "1.5rem" }} />
        )}
        <HeaderLinkLogo onClick={() => navigate(RoutesEnums.Home)}>
          <HeaderLogotipo src="/images/logo-vertical.png" alt="Logotipo" />
          <HeaderTitle>ResSys</HeaderTitle>
        </HeaderLinkLogo>
      </HeaderLogoContainer>

      <HeaderContainerButtons>
        {!user ? (
          <>
            <Button type="link" style={{ color: "#fff" }} onClick={() => navigate(RoutesEnums.Login)}>
              Entrar
            </Button>
            <Button type="primary" onClick={() => navigate(RoutesEnums.Register)}>
              Cadastrar
            </Button>
          </>
        ) : (
          <>
            <UserNameContainer>{handleCapitalizeWord(user?.name)}</UserNameContainer>

            <Tooltip title="Notificações">
              <Button type="text" icon={<BellFilled style={{ fontSize: "20px", color: "#fff" }} />} />
            </Tooltip>

            <Tooltip title="Sair">
              <Button type="text" icon={<LogoutOutlined style={{ fontSize: "20px", color: "#fff" }} />} onClick={() => logout(navigate)} />
            </Tooltip>
          </>
        )}
      </HeaderContainerButtons>
    </HeaderContainer>
  );
};

export default Header;
