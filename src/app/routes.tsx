import { RoutesEnums, RoutesPrivateEnums } from "../types/enums";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Screen from "../components/Screen";

export const screensRoutes = [
  {
    path: RoutesEnums.Home,
    element: <Screen />,
    children: [
      { path: RoutesEnums.Login, element: <Login /> },
      { path: RoutesEnums.Register, element: <Register /> },
    ],
  },
];

export const privateRoutes = [
  {
    path: RoutesEnums.Home,
    element: <Screen />,
    children: [
      {
        path: RoutesPrivateEnums.Home,
        element: <Home />,
      },
    ],
  },
];
