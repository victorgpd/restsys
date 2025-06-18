import { useAppSelector } from "../../utils/useStore";
import { MenuContainer, PainelContainer } from "./styles";

const Painel = ({ children }: { children: React.ReactNode }) => {
  const { menuIsOpen } = useAppSelector((state) => state.globalReducer);

  return (
    <>
      <MenuContainer isOpen={menuIsOpen}></MenuContainer>
      <PainelContainer isOpen={menuIsOpen}>{children}</PainelContainer>
    </>
  );
};

export default Painel;
