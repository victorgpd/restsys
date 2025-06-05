import { RoutesEnums } from "../types/enums";

export const screensRoutes = [
  {
    path: RoutesEnums.Home,
    element: <h1>Home</h1>,
  },
  {
    path: RoutesEnums.Login,
    element: <h1>Login</h1>,
  },
  {
    path: RoutesEnums.Register,
    element: <h1>Register</h1>,
  },
];

export const privateRoutes = [
  {
    path: RoutesEnums.Dashboard,
    element: <h1>Dashboard</h1>,
  },
];
