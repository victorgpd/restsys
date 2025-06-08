import { MenuContainer, PainelContainer } from "./styles";

const Painel = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MenuContainer></MenuContainer>
      <PainelContainer>{children}</PainelContainer>
    </>
  );
};

export default Painel;
