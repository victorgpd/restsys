import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { privateRoutes, screensRoutes } from "./app/routes";

function App() {
  const routes = createBrowserRouter([...screensRoutes, ...privateRoutes]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
