import { useAppSelector } from "../../utils/useStore";
import { MenuContainer, PainelContainer } from "./styles";

const Painel = ({ children }: { children: React.ReactNode }) => {
  const { menuIsOpen } = useAppSelector((state) => state.globalReducer);

  return (
    <>
      <MenuContainer style={{ left: menuIsOpen ? 0 : "-246px" }}></MenuContainer>
      <PainelContainer style={{ paddingLeft: menuIsOpen ? 246 : 0 }}>{children}</PainelContainer>
    </>
  );
};

export default Painel;
