import { Button } from "antd";
import { HeaderContainer, HeaderContainerButtons, HeaderLinkLogo, HeaderLogoContainer, HeaderLogotipo, HeaderTitle } from "./styles";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../utils/useStore";
import { setMenuIsOpen } from "../../redux/globalReducer/slice";
import { RoutesEnums } from "../../types/enums";
import { useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Header = () => {
  const dispatch = useAppDispatch();

  const { verifyLogged } = useAuthentication();
  const { menuIsOpen, user } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    verifyLogged();
  }, []);

  const handleToggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  return (
    <HeaderContainer style={window.location.pathname.includes("home") ? { width: menuIsOpen ? "calc(100% - 246px)" : "100%", left: menuIsOpen ? 246 : 0 } : { width: "100%", left: 0 }}>
      <HeaderLogoContainer>
        {window.location.pathname.includes("home") && (
          <Button type="text" onClick={handleToggleMenu} icon={menuIsOpen ? <CloseOutlined style={{ color: "#fff" }} /> : <MenuOutlined style={{ color: "#fff" }} />} style={{ fontSize: "1.5rem" }} />
        )}
        <HeaderLinkLogo href="/">
          <HeaderLogotipo src="/images/logo-vertical.png" alt="Logotipo" />
          <HeaderTitle>ResSys</HeaderTitle>
        </HeaderLinkLogo>
      </HeaderLogoContainer>

      <HeaderContainerButtons>
        {!user && (
          <>
            <Button
              type="link"
              variant="link"
              style={{ color: "#fff" }}
              onClick={() => {
                window.location.href = RoutesEnums.Login;
              }}
            >
              Entrar
            </Button>
            <Button
              variant="solid"
              color="blue"
              onClick={() => {
                window.location.href = RoutesEnums.Register;
              }}
            >
              Cadastrar
            </Button>
          </>
        )}

        {user && (
          <>
            <span>{user.name}</span>
          </>
        )}
      </HeaderContainerButtons>
    </HeaderContainer>
  );
};

export default Header;
