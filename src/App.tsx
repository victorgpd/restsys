import { privateRoutes, screensRoutes } from "./app/routes";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { useAuthentication } from "./hooks/useAuthentication";

function App() {
  const { verifyLoggedIn } = useAuthentication();

  const routes: RouteObject[] = [...screensRoutes];
  const routesLogged: RouteObject[] = [...privateRoutes].map((route) => ({
    ...route,
    loader: verifyLoggedIn,
  }));

  const router = createBrowserRouter([...routes, ...routesLogged]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
