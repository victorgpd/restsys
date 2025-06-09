import { Button } from "antd";
import { HeaderContainer } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../utils/useStore";
import { setMenuIsOpen } from "../../redux/globalReducer/slice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { menuIsOpen } = useAppSelector((state) => state.globalReducer);

  const handleToggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  return (
    <HeaderContainer style={window.location.pathname.includes("dashboard") ? { width: menuIsOpen ? "calc(100% - 246px)" : "100%", left: menuIsOpen ? 246 : 0 } : { width: "100%", left: 0 }}>
      {window.location.pathname.includes("dashboard") && <Button type="text" onClick={handleToggleMenu} icon={<MenuOutlined style={{ color: "#fff" }} />} style={{ fontSize: "1.5rem" }} />}
    </HeaderContainer>
  );
};

export default Header;
