import { Navigate } from "react-router-dom";
import { Home } from "../pages/home";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
