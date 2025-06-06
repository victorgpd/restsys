import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { privateRoutes, screensRoutes } from "./app/routes";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const routes = createBrowserRouter([...screensRoutes, ...privateRoutes]);

  return (
    <>
      <Header />
      <Main>
        <RouterProvider router={routes} />
      </Main>
    </>
  );
}

export default App;
