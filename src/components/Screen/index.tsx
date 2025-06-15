import { Outlet } from "react-router-dom";
import Header from "../Header";
import Main from "../Main";

const Screen = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Screen;
