import { RoutesEnums, RoutesPrivateEnums } from "../types/enums";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

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
    element: <h1>Register</h1>,
  },
];

export const privateRoutes = [
  {
    path: RoutesPrivateEnums.Dashboard,
    element: <Dashboard />,
  },
];
