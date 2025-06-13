import { RoutesEnums, RoutesPrivateEnums } from "../types/enums";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

export const screensRoutes = [
  {
    path: RoutesEnums.Home,
    element: <h1>Home</h1>,
  },
  {
    path: RoutesEnums.Login,
    element: <Login />,
  },
  {
    path: RoutesEnums.Register,
    element: <Register />,
  },
];

export const privateRoutes = [
  {
    path: RoutesPrivateEnums.Home,
    element: <Home />,
  },
];
